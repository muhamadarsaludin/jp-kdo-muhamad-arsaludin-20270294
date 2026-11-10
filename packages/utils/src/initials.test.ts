import { describe, expect, it } from "vitest";

import { getInitials } from "./initials";

describe("getInitials", () => {
  it("returns a single letter for one word", () => {
    expect(getInitials("Muhamad")).toBe("M");
  });

  it("returns first and last letters for two words", () => {
    expect(getInitials("Muhamad Arsaludin")).toBe("MA");
  });

  it("returns first and last letters for three words", () => {
    expect(getInitials("Moch Darul Nami")).toBe("MN");
  });

  it("returns first two letters for four or more words", () => {
    expect(getInitials("Ahmad Bagus Kurniawan Putra")).toBe("AB");
  });

  it("handles extra whitespace", () => {
    expect(getInitials("  Muhamad   Arsaludin  ")).toBe("MA");
  });

  it("uppercases the result", () => {
    expect(getInitials("muhamad arsaludin")).toBe("MA");
  });

  it("returns empty string for empty input", () => {
    expect(getInitials("")).toBe("");
    expect(getInitials("   ")).toBe("");
  });
});
