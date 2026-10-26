import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

function gte(actual: string, expected: string): boolean {
  const a = actual.split(".").map(Number);
  const b = expected.split(".").map(Number);
  if (a[0] !== b[0]) return a[0] > b[0];
  if (a[1] !== b[1]) return a[1] > b[1];
  return a[2] >= b[2];
}

describe("zod security update (GHSA-mrhx-c7xc-m3w5)", () => {
  test("installed zod is at least the fixed version 4.6.6", () => {
    const zodPkg = JSON.parse(
      readFileSync(
        new URL("../node_modules/zod/package.json", import.meta.url),
        "utf8",
      ),
    );
    expect(gte(zodPkg.version, "4.6.6")).toBe(true);
  });
});
