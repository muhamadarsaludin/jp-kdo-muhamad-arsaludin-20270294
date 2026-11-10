import { describe, expect, it } from "vitest";

import { rupiah, tanggal } from "./format";

describe("format", () => {
  it("memformat rupiah tanpa desimal", () => {
    expect(rupiah(1250000)).toContain("1.250.000");
    expect(rupiah(0)).toContain("0");
  });

  it("memformat tanggal ke id-ID", () => {
    expect(tanggal("2026-11-10T12:00:00+07:00")).toMatch(/10/);
    expect(tanggal("bukan tanggal")).toBe("-");
  });
});
