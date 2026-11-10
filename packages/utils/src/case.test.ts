import { describe, expect, it } from "vitest";

import {
  capitalize,
  splitWords,
  toCamelCase,
  toConstantCase,
  toKebabCase,
  toPascalCase,
  toSentenceCase,
  toSnakeCase,
  toTitleCase,
} from "./case";

describe("capitalize", () => {
  it("capitalizes the first letter and lowercases the rest", () => {
    expect(capitalize("hello")).toBe("Hello");
    expect(capitalize("hELLO")).toBe("Hello");
  });

  it("returns empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("splitWords", () => {
  it("splits on spaces, underscores, and dashes", () => {
    expect(splitWords("hello world")).toEqual(["hello", "world"]);
    expect(splitWords("hello_world")).toEqual(["hello", "world"]);
    expect(splitWords("hello-world")).toEqual(["hello", "world"]);
  });

  it("splits camelCase and PascalCase boundaries", () => {
    expect(splitWords("helloWorld")).toEqual(["hello", "World"]);
    expect(splitWords("HelloWorld")).toEqual(["Hello", "World"]);
  });

  it("splits acronym boundaries", () => {
    expect(splitWords("HTTPServer")).toEqual(["HTTP", "Server"]);
  });

  it("handles mixed separators and empty input", () => {
    expect(splitWords("  hello _- world ")).toEqual(["hello", "world"]);
    expect(splitWords("")).toEqual([]);
  });
});

describe("toCamelCase", () => {
  it("converts to camelCase", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
    expect(toCamelCase("Hello_World")).toBe("helloWorld");
    expect(toCamelCase("hello-world")).toBe("helloWorld");
    expect(toCamelCase("helloWorld")).toBe("helloWorld");
  });

  it("returns empty string for empty input", () => {
    expect(toCamelCase("")).toBe("");
  });
});

describe("toPascalCase", () => {
  it("converts to PascalCase", () => {
    expect(toPascalCase("hello world")).toBe("HelloWorld");
    expect(toPascalCase("hello_world")).toBe("HelloWorld");
  });
});

describe("toSnakeCase", () => {
  it("converts to snake_case", () => {
    expect(toSnakeCase("hello world")).toBe("hello_world");
    expect(toSnakeCase("helloWorld")).toBe("hello_world");
    expect(toSnakeCase("Hello-World")).toBe("hello_world");
  });
});

describe("toConstantCase", () => {
  it("converts to CONSTANT_CASE", () => {
    expect(toConstantCase("hello world")).toBe("HELLO_WORLD");
    expect(toConstantCase("helloWorld")).toBe("HELLO_WORLD");
  });
});

describe("toKebabCase", () => {
  it("converts to kebab-case", () => {
    expect(toKebabCase("hello world")).toBe("hello-world");
    expect(toKebabCase("helloWorld")).toBe("hello-world");
    expect(toKebabCase("Hello_World")).toBe("hello-world");
  });
});

describe("toSentenceCase", () => {
  it("converts to sentence case", () => {
    expect(toSentenceCase("hello world")).toBe("Hello world");
    expect(toSentenceCase("HELLO_WORLD")).toBe("Hello world");
  });

  it("returns empty string for empty input", () => {
    expect(toSentenceCase("")).toBe("");
  });
});

describe("toTitleCase", () => {
  it("converts to Title Case", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
    expect(toTitleCase("helloWorld foo-bar")).toBe("Hello World Foo Bar");
  });
});
