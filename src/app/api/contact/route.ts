import { createHash } from "node:crypto";
import { validateContact } from "@/lib/contact-validation";
import { allowRequest } from "@/lib/rate-limit";
export const runtime = "nodejs";
export const maxDuration = 30;
const unavailable =
  "We could not confirm receipt of your enquiry. Please try again, or contact us by phone or email.";
const reply = (data: Record<string, unknown>, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestURL = new URL(request.url);
  // Next.js may use its internal listening hostname in request.url. The Host
  // header retains the visitor-facing host; the trusted host terminates TLS.
  const host = request.headers.get("host") || requestURL.host;
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol === "https" || forwardedProtocol === "http"
      ? forwardedProtocol + ":"
      : requestURL.protocol;
  if (origin && origin !== `${protocol}//${host}`)
    return reply(
      { ok: false, message: "Please submit your enquiry from this website." },
      403,
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ ok: false, message: "Please use the enquiry form." }, 415);
  const ip = (
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for") ||
    "unknown"
  )
    .split(",")[0]
    .trim();
  if (!allowRequest(createHash("sha256").update(ip).digest("hex")))
    return reply(
      {
        ok: false,
        message: "Please wait a few minutes before sending another enquiry.",
      },
      429,
    );
  let input: unknown;
  try {
    if (Number(request.headers.get("content-length") || 0) > 16384)
      return reply({ ok: false, message: "Your enquiry is too long." }, 413);
    const reader = request.body?.getReader();
    if (!reader)
      return reply({ ok: false, message: "Please complete the form." }, 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16384) {
        await reader.cancel();
        return reply({ ok: false, message: "Your enquiry is too long." }, 413);
      }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply(
      { ok: false, message: "Please check your enquiry and try again." },
      400,
    );
  }
  const result = validateContact(input);
  if (!result.ok)
    return reply(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        errors: result.errors,
      },
      400,
    );
  if (result.data.website) return reply({ ok: true });
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!webhook || !secret)
    return reply({ ok: false, message: unavailable }, 503);
  try {
    const url = new URL(webhook);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "script.google.com" ||
      !/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname)
    )
      return reply({ ok: false, message: unavailable }, 503);
    const { website: honeypot, ...data } = result.data;
    void honeypot;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
        secret,
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Upstream rejected");
    const confirmation: unknown = await response.json();
    if (
      !confirmation ||
      typeof confirmation !== "object" ||
      (confirmation as { ok?: unknown }).ok !== true
    )
      throw new Error("Unconfirmed append");
    return reply({ ok: true });
  } catch {
    return reply({ ok: false, message: unavailable }, 502);
  }
}
