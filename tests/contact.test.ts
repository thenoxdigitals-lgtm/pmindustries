import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { validateContact } from "../src/lib/contact-validation";
import { allowRequest } from "../src/lib/rate-limit";
import { POST } from "../src/app/api/contact/route";
const valid = () => ({
  name: "Test Engineer",
  company: "Test company",
  phone: "+919890114253",
  email: "test@example.com",
  product: "Termination kit",
  voltageClass: "11 kV",
  message: "Test only: quotation for a cable termination.",
  sourcePage: "/request-quote",
  website: "",
  requestId: randomUUID(),
});
test("validation rejects arrays, oversized input and invalid required fields", () => {
  assert.equal(validateContact([]).ok, false);
  assert.equal(
    validateContact({ ...valid(), message: "x".repeat(4001) }).ok,
    false,
  );
  assert.equal(
    validateContact({
      ...valid(),
      name: " ",
      email: "invalid",
      phone: "letters",
    }).ok,
    false,
  );
  assert.equal(
    validateContact({ ...valid(), sourcePage: "https://external.example" }).ok,
    false,
  );
  assert.equal(validateContact({ ...valid(), requestId: "bad-id" }).ok, false);
  assert.equal(validateContact(valid()).ok, true);
});
test("rate limit expires and isolates request keys", () => {
  const key = randomUUID();
  for (let i = 0; i < 5; i++) assert.equal(allowRequest(key, 1000), true);
  assert.equal(allowRequest(key, 1001), false);
  assert.equal(allowRequest(randomUUID(), 1001), true);
  assert.equal(allowRequest(key, 601001), true);
});
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://example.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "https://example.com",
      "x-forwarded-for": randomUUID(),
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
test("contact route guards origin, content type, malformed and oversized bodies", async () => {
  // A deployed Next server can retain its internal hostname in request.url.
  // Honeypot responses let this check run without configuring an upstream.
  assert.equal(
    (
      await POST(
        request(
          { ...valid(), website: "spam" },
          {
            host: "public.example",
            origin: "https://public.example",
            "x-forwarded-proto": "https",
          },
        ),
      )
    ).status,
    200,
  );
  assert.equal(
    (
      await POST(
        request(valid(), {
          host: "public.example",
          origin: "https://other.example",
          "x-forwarded-proto": "https",
        }),
      )
    ).status,
    403,
  );
  assert.equal(
    (await POST(request(valid(), { origin: "https://other.example" }))).status,
    403,
  );
  assert.equal(
    (await POST(request(valid(), { "Content-Type": "text/plain" }))).status,
    415,
  );
  assert.equal(
    (await POST(request({ ...valid(), message: "x".repeat(17000) }))).status,
    413,
  );
  assert.equal(
    (
      await POST(
        new Request("https://example.com/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": randomUUID(),
          },
          body: "{bad",
        }),
      )
    ).status,
    400,
  );
});
test("contact route requires a confirmed upstream append and keeps secret server-side", async () => {
  const originalFetch = global.fetch;
  const oldURL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const oldSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  try {
    delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    delete process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    assert.equal((await POST(request(valid()))).status, 503);
    assert.equal(
      (await POST(request({ ...valid(), website: "spam" }))).status,
      200,
    );
    process.env.GOOGLE_SHEETS_WEBHOOK_URL =
      "https://script.google.com/macros/s/test/exec";
    process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = "test-secret";
    let sent: Record<string, unknown> = {};
    global.fetch = async (_input, init) => {
      sent = JSON.parse(String(init?.body));
      return Response.json({ ok: true });
    };
    const response = await POST(
      request({ ...valid(), submittedAt: "injected" }),
    );
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(sent.secret, "test-secret");
    assert.equal("website" in sent, false);
    assert.notEqual(sent.submittedAt, "injected");
    assert.ok(Date.now() - new Date(String(sent.submittedAt)).getTime() < 5000);
    global.fetch = async () =>
      Response.json({ ok: false, internalError: "private" });
    const failed = await POST(request(valid()));
    assert.equal(failed.status, 502);
    assert.equal(
      JSON.stringify(await failed.json()).includes("private"),
      false,
    );
    global.fetch = async () => new Response("<html>Sign in</html>");
    assert.equal((await POST(request(valid()))).status, 502);
    global.fetch = async () => {
      throw new Error("private stack");
    };
    assert.equal((await POST(request(valid()))).status, 502);
  } finally {
    global.fetch = originalFetch;
    if (oldURL === undefined) delete process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.GOOGLE_SHEETS_WEBHOOK_URL = oldURL;
    if (oldSecret === undefined)
      delete process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    else process.env.GOOGLE_SHEETS_WEBHOOK_SECRET = oldSecret;
  }
});
