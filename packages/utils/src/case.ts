/**
 * Capitalizes the first letter of a word and lowercases the rest.
 *
 * @param word - Any string; an empty string returns an empty string.
 * @returns `word` with its first character uppercased and remaining characters lowercased.
 *
 * @example
 * capitalize("hello") // "Hello"
 * capitalize("hELLO") // "Hello"
 */
export function capitalize(word: string): string {
  if (word.length === 0) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

/**
 * Splits a string into words, handling spaces, underscores, dashes, camelCase,
 * PascalCase, and acronym boundaries (e.g. `"HTTPServer"`).
 *
 * @param input - Any casing or separator convention: `"hello world"`,
 * `"hello_world"`, `"hello-world"`, `"helloWorld"`, `"HTTPServer"`.
 * @returns Array of words, in order. An empty/blank input returns `[]`.
 *
 * @example
 * splitWords("HelloWorld foo-bar") // ["Hello", "World", "foo", "bar"]
 */
export function splitWords(input: string): string[] {
  return input
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(Boolean);
}

/**
 * Converts any string casing to `camelCase`.
 *
 * @param input - Source string in any casing.
 * @returns `camelCase` version; empty input returns `""`.
 *
 * @example
 * toCamelCase("hello world") // "helloWorld"
 * toCamelCase("HTTP-Server") // "httpServer"
 */
export function toCamelCase(input: string): string {
  const words = splitWords(input);
  const first = words[0] ?? "";
  return first.toLowerCase() + words.slice(1).map(capitalize).join("");
}

/**
 * Converts any string casing to `PascalCase` (UpperCamelCase).
 *
 * @param input - Source string in any casing.
 * @returns `PascalCase` version; empty input returns `""`.
 *
 * @example
 * toPascalCase("hello_world") // "HelloWorld"
 */
export function toPascalCase(input: string): string {
  return splitWords(input).map(capitalize).join("");
}

/**
 * Converts any string casing to `snake_case`.
 *
 * @param input - Source string in any casing.
 * @returns Lowercase words joined by `_`; empty input returns `""`.
 *
 * @example
 * toSnakeCase("helloWorld") // "hello_world"
 */
export function toSnakeCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toLowerCase())
    .join("_");
}

/**
 * Converts any string casing to `CONSTANT_CASE` (screaming snake case).
 *
 * @param input - Source string in any casing.
 * @returns Uppercase words joined by `_`; empty input returns `""`.
 *
 * @example
 * toConstantCase("hello world") // "HELLO_WORLD"
 */
export function toConstantCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toUpperCase())
    .join("_");
}

/**
 * Converts any string casing to `kebab-case` (dash case).
 *
 * @param input - Source string in any casing.
 * @returns Lowercase words joined by `-`; empty input returns `""`.
 *
 * @example
 * toKebabCase("Hello_World") // "hello-world"
 */
export function toKebabCase(input: string): string {
  return splitWords(input)
    .map((word) => word.toLowerCase())
    .join("-");
}

/**
 * Converts any string casing to Sentence case: only the first word starts
 * with a capital, the rest is lowercased.
 *
 * @param input - Source string in any casing.
 * @returns Sentence-cased string; empty input returns `""`.
 *
 * @example
 * toSentenceCase("HELLO_WORLD") // "Hello world"
 */
export function toSentenceCase(input: string): string {
  const words = splitWords(input);
  const first = words[0] ?? "";
  const rest = words.slice(1).map((word) => word.toLowerCase());
  return capitalize(first) + (rest.length > 0 ? ` ${rest.join(" ")}` : "");
}

/**
 * Converts any string casing to Title Case: every word capitalized.
 *
 * @param input - Source string in any casing.
 * @returns Title-cased string; empty input returns `""`.
 *
 * @example
 * toTitleCase("helloWorld foo-bar") // "Hello World Foo Bar"
 */
export function toTitleCase(input: string): string {
  return splitWords(input).map(capitalize).join(" ");
}
