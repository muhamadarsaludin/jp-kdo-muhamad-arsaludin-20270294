import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("joins multiple class names with a space", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("ignores falsy values", () => {
    const isFalsy = Boolean(0);
    expect(cn("a", isFalsy && "b", null, undefined, isFalsy && "d", "c")).toBe("a c");
  });

  it("resolves conditional expressions", () => {
    const isShown = Boolean(1);
    const isHidden = Boolean(0);
    expect(cn("a", isShown ? "b" : "x", isHidden ? "c" : "y")).toBe("a b y");
  });

  it("dedupes conflicting tailwind utilities", () => {
    expect(cn("p-2 p-4")).toBe("p-4");
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("keeps non-conflicting utilities", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("returns empty string for no input", () => {
    expect(cn()).toBe("");
  });
});
