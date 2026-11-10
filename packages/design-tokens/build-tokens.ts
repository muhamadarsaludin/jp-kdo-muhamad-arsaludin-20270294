/**
 * Token build script for @wedo/altar-design-tokens.
 *
 * Reads the DTCG-style sources in `tokens/` and generates the committed web
 * artifacts in `output/`: `primitives.css` (Style Dictionary), `semantics.css`
 * and `utilities.css` (light/dark runtime vars + `@theme inline` mappings),
 * and the `tokens.md` reference. Run `pnpm sort` before `pnpm generate`.
 *
 * Run directly with `node build-tokens.ts` (package script: `generate`).
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import StyleDictionary from "style-dictionary";
import type { Config, FormatFnArguments, TransformedToken } from "style-dictionary/types";

const TOKENS_DIR = "tokens";

type TokenValue = string | number | unknown[] | Record<string, unknown>;

/** A normalized leaf token as parsed from `$value`/`$type` DTCG entries. */
type RawToken = { value: TokenValue; type?: string };

/** Normalized token tree: nested groups (objects) and leaf {@link RawToken}s. */
export type TokenNode = { [key: string]: RawToken | TokenNode };

/** A single leaf token with its full path, used by web conversion and docs. */
type FlatToken = { path: string[]; value: TokenValue; type?: string };

export function loadTokenFile(file: string): TokenNode {
  const source = JSON.parse(readFileSync(join(TOKENS_DIR, file), "utf8")) as Record<
    string,
    unknown
  >;
  return normalizeNode(source);
}

function normalizeNode(source: Record<string, unknown>): TokenNode {
  const result: TokenNode = {};
  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith("$") || typeof value !== "object" || value === null || Array.isArray(value))
      continue;
    const record = value as Record<string, unknown>;
    if ("$value" in record) {
      result[key] = {
        value: record.$value as TokenValue,
        type: record.$type as string | undefined,
      };
    } else {
      result[key] = normalizeNode(record);
    }
  }
  return result;
}

/**
 * Flattens a normalized token tree into a list of leaf tokens with their
 * full dot-path (e.g. `["color", "brand", "500"]`).
 *
 * @param node - Normalized token tree (see {@link TokenNode}).
 * @param base - Internal path accumulator; callers omit it.
 * @returns Every token leaf in tree order.
 *
 * @example
 * collectTokens({ color: { brand: { "500": { value: "#d3607c" } } } })
 * // => [{ path: ["color", "brand", "500"], value: "#d3607c", type: undefined }]
 */
export function collectTokens(node: TokenNode, base: string[] = []): FlatToken[] {
  const result: FlatToken[] = [];
  for (const [key, value] of Object.entries(node)) {
    if (isToken(value)) {
      result.push({ path: [...base, key], value: value.value, type: value.type });
    } else {
      result.push(...collectTokens(value, [...base, key]));
    }
  }
  return result;
}

function isToken(value: RawToken | TokenNode): value is RawToken {
  return "value" in value;
}

function cssName(path: string[]): string {
  return path
    .join("-")
    .replace(/(\d+)_(\d+)/g, "$1.$2")
    .replaceAll("_", "-")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Maps a token path to the final CSS custom property name used in the web
 * output (kebab-case, `0_5` fractional steps become `0.5`, group-level
 * namespace renames like `fontSize` → `text`, `lineHeight` → `leading`).
 *
 * @param token - Any token-shaped value; only `path` is read.
 * @returns The CSS variable name without the leading `--`.
 *
 * @example
 * toWebName({ path: ["spacing", "0_5"] }) // "spacing-0.5"
 * toWebName({ path: ["lineHeight", "tight"] }) // "leading-tight"
 */
export function toWebName(token: { path: string[] }): string {
  const [group = "", ...rest] = token.path;
  const namespace: Record<string, string> = {
    fontWeight: "font-weight",
    fontSize: "text",
    lineHeight: "leading",
    letterSpacing: "tracking",
  };
  const name = rest.length === 0 ? group : `${namespace[group] ?? group}-${rest.join("-")}`;
  return cssName(name.split("-"));
}

function cssReference(reference: string): string {
  const path = reference.slice(1, -1);
  return `var(--${toWebName({ path: path.split(".") })})`;
}

function cssValue(value: TokenValue): string {
  if (typeof value === "string") {
    const referenceWithAlpha = value.match(/^\{([^}]+)\}([\da-f]{2})$/i);
    if (referenceWithAlpha) {
      const opacity = (Number.parseInt(referenceWithAlpha[2] ?? "0", 16) / 255) * 100;
      const reference = referenceWithAlpha[1] ?? "";
      return `color-mix(in srgb, var(--${cssName(reference.split("."))}) ${opacity.toFixed(2)}%, transparent)`;
    }
    if (value.startsWith("{") && value.endsWith("}")) return cssReference(value);
    return value;
  }
  if (typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((item) => cssValue(item as TokenValue)).join(", ");
  return Object.values(value)
    .map((item) => cssValue(item as TokenValue))
    .join(" ");
}

/**
 * Converts a normalized token leaf to its web CSS value, applying group-level
 * units and formats: `spacing/radius/fontSize/text` get `px`, `letterSpacing`
 * gets `em`, `opacity` becomes a percentage, typed `shadow` lists become CSS
 * box-shadow strings, and references (`{color.brand.500}` or `…{aa}` alpha
 * suffix) become `var()` / `color-mix()` expressions.
 *
 * @param token - A flattened token leaf.
 * @returns The resolved CSS value string.
 *
 * @example
 * webValue({ path: ["spacing", "1"], value: 4 }) // "4px"
 * webValue({ path: ["opacity", "50"], value: 0.5 }) // "50%"
 */
export function webValue(token: { path: string[]; value: TokenValue }): string {
  const group = token.path[0];
  if (group === "opacity" && typeof token.value === "number") return `${token.value * 100}%`;
  if (group === "spacing" || group === "radius" || group === "fontSize")
    return `${cssValue(token.value)}px`;
  if (group === "letterSpacing") return `${cssValue(token.value)}em`;
  if (group === "duration") return `${cssValue(token.value)}ms`;
  if (group === "text" && typeof token.value === "number") return `${token.value}px`;
  if (group === "text" && typeof token.value === "string" && /^-?\d+(\.\d+)?$/.test(token.value)) {
    return `${token.value}px`;
  }
  if (group === "text" && !Array.isArray(token.value) && typeof token.value === "object") {
    const size = token.value.fontSizes;
    if (size === undefined) return "";
    const resolvedSize = cssValue(size as TokenValue);
    return /^-?\d+(\.\d+)?$/.test(resolvedSize) ? `${resolvedSize}px` : resolvedSize;
  }
  if (group === "shadow" && Array.isArray(token.value)) {
    return token.value
      .map((shadow) => {
        const item = shadow as Record<string, unknown>;
        const length = (part: unknown) => `${part}px`;
        return `${item.inset ? "inset " : ""}${length(item.offsetX)} ${length(item.offsetY)} ${length(item.blur)} ${length(item.spread)} ${item.color}`;
      })
      .join(", ");
  }
  return cssValue(token.value);
}

/**
 * Returns the CSS custom property declarations for a token: the main
 * `-- name: value` line, plus a `-- text-<size>--line-height` companion
 * line for typography tokens whose value carries a line height.
 *
 * @param token - A flattened token leaf.
 * @returns One or two declaration lines (without indentation).
 *
 * @example
 * webDeclarations({ path: ["text", "xs"], value: { fontSizes: 12, lineHeights: "calc(1 / 0.75)" } })
 * // => ["--text-xs: 12px;", "--text-xs--line-height: calc(1 / 0.75);"]
 */
export function webDeclarations(token: { path: string[]; value: TokenValue }): string[] {
  const name = toWebName(token);
  const declarations = [`--${name}: ${webValue(token)};`];
  if (token.path[0] === "text" && typeof token.value === "object" && !Array.isArray(token.value)) {
    const lineHeight = token.value.lineHeights ?? token.value.lineHeight;
    if (lineHeight !== undefined) {
      declarations.push(`--${name}--line-height: ${cssValue(lineHeight as TokenValue)};`);
    }
  }
  return declarations;
}

function registerThemeFormat(
  name: string,
  include: (token: TransformedToken) => boolean,
  header = "@theme",
): void {
  StyleDictionary.registerFormat({
    name,
    format: ({ dictionary }: FormatFnArguments) => {
      const lines = dictionary.allTokens
        .filter((token) => include(token) && token.path[0] !== "fontSize")
        .flatMap((token) =>
          webDeclarations({ path: token.path, value: token.value ?? "" }).map(
            (line) => `  ${line}`,
          ),
        )
        .filter((line) => !line.endsWith(": ;"));
      return `${header} {\n${lines.join("\n")}\n}\n`;
    },
  });
}

registerThemeFormat("altar/web-primitives", () => true);

function colorRootName(name: string): string {
  return name.startsWith("color-") ? name : `color-${name}`;
}

function modeVarBlock(selector: string, tokens: FlatToken[]): string {
  const lines = tokens.map(
    (token) => `  --${colorRootName(cssName(token.path))}: ${cssValue(token.value)};`,
  );
  return `${selector} {\n${lines.join("\n")}\n}`;
}

function generateModeCss(light: TokenNode, dark: TokenNode): string {
  const lightTokens = collectTokens(light);
  const darkTokens = collectTokens(dark);
  const names = [...new Set([...lightTokens, ...darkTokens].map((token) => cssName(token.path)))];
  const theme = names
    .map((name) => `  --${colorRootName(name)}: var(--${colorRootName(name)});`)
    .join("\n");
  return `${modeVarBlock(":root", lightTokens)}\n\n${modeVarBlock(".dark", darkTokens)}\n\n@theme inline {\n${theme}\n}\n`;
}

/**
 * Builds the full `semantics.css` output: light (`:root`) and dark (`.dark`)
 * runtime variables per semantic role plus an `@theme inline` block that
 * maps Tailwind short-form utilities (`bg-*`, `text-*`, `border-*`, `stroke-*`,
 * `fill-*`, `ring-*`, `outline-*`) onto them using the stripped-prefix
 * naming documented in AGENTS.md.
 *
 * @param light - Normalized light-mode semantic tokens.
 * @param dark - Normalized dark-mode semantic tokens.
 * @returns The complete CSS file contents.
 */
export function generateSemanticCss(light: TokenNode, dark: TokenNode): string {
  const lightTokens = collectTokens(light);
  const darkTokens = collectTokens(dark);
  const names = [...new Set([...lightTokens, ...darkTokens].map((token) => cssName(token.path)))];
  const root = (name: string) => colorRootName(name);
  const strip = (name: string, prefix: string) => name.slice(prefix.length);
  const section = (title: string, lines: string[]) =>
    lines.length > 0 ? `  /* ${title} */\n${lines.join("\n")}` : "";

  const bg = names.filter((name) => name.startsWith("bg-"));
  const text = names.filter((name) => name.startsWith("text-"));
  const border = names.filter((name) => name.startsWith("border-"));
  // Short-form utilities (Untitled UI style): Tailwind v4 resolves `bg-*` from
  // `--background-color-*`, `text-*` from `--text-color-*`, `border-*` from
  // `--border-color-*`, `ring-*` from `--ring-color-*`, and `outline-*` from
  // `--outline-color-*`. Stripping the semantic group prefix avoids doubled
  // class names like `bg-bg-primary`. `ring-`/`outline-`/`stroke-` reuse the
  // `border.*` token so all of them stay in sync (e.g. Spinner uses
  // `stroke-brand-primary`); `fill-*` reuses the `text.*` token instead.
  const background = section(
    "Background",
    bg.map((name) => `  --background-color-${strip(name, "bg-")}: var(--${root(name)});`),
  );
  const textSection = section(
    "Text",
    text.map((name) => `  --text-color-${strip(name, "text-")}: var(--${root(name)});`),
  );
  const borderSection = section(
    "Border",
    border.map((name) => `  --border-color-${strip(name, "border-")}: var(--${root(name)});`),
  );
  const stroke = section(
    "Stroke",
    border.map((name) => `  --stroke-${strip(name, "border-")}: var(--${root(name)});`),
  );
  const fill = section(
    "Fill",
    text.map((name) => `  --fill-${strip(name, "text-")}: var(--${root(name)});`),
  );
  const ring = section(
    "Ring",
    border.map((name) => `  --ring-color-${strip(name, "border-")}: var(--${root(name)});`),
  );
  const outline = section(
    "Outline",
    border.map((name) => `  --outline-color-${strip(name, "border-")}: var(--${root(name)});`),
  );

  const inlineBody = [background, textSection, borderSection, stroke, fill, ring, outline]
    .filter(Boolean)
    .join("\n");
  return `${modeVarBlock(":root", lightTokens)}\n\n${modeVarBlock(".dark", darkTokens)}\n\n@theme inline {\n${inlineBody}\n}\n`;
}

function toCssVar(path: string[]): string {
  return cssName(path);
}

export function oklchToSrgb(
  _value: string,
): { hex: string; r: number; g: number; b: number } | null {
  return null;
}

function resolveTokenValue(
  value: TokenValue,
  primitives: TokenNode,
  seen = new Set<string>(),
): string {
  if (typeof value !== "string") return cssValue(value);
  const reference = value.match(/^\{([^}]+)\}(.*)$/);
  if (!reference) return value;
  const path = reference[1] ?? "";
  if (seen.has(path)) return value;
  let current: RawToken | TokenNode | undefined = primitives;
  for (const segment of path.split(".")) {
    if (!current || isToken(current)) return value;
    current = current[segment];
  }
  if (!current || !isToken(current)) return value;
  return `${resolveTokenValue(current.value, primitives, new Set([...seen, path]))}${reference[2] ?? ""}`;
}

function colorPreview(token: FlatToken, primitives: TokenNode): string {
  if (token.type !== "color" && token.path[0] !== "color") return "";
  const value = resolveTokenValue(token.value, primitives);
  if (!/^#[\da-f]{3,8}$/i.test(value)) return "";
  return `<span title="${value}" style="display:inline-block;width:1em;height:1em;background:${value};border:1px solid #999;border-radius:2px;vertical-align:middle"></span>`;
}

function docsTable(tokens: FlatToken[], primitives: TokenNode, mode?: string): string[] {
  const showPreview = tokens.some((token) => token.type === "color" || token.path[0] === "color");
  const lines = [
    mode ? `### ${mode}` : "",
    "",
    showPreview
      ? "| Token | Type | Value | Preview | CSS variable |"
      : "| Token | Type | Value | CSS variable |",
    showPreview ? "| --- | --- | --- | --- | --- |" : "| --- | --- | --- | --- |",
  ];
  for (const token of tokens) {
    const value = mode ? cssValue(token.value) : webValue(token);
    lines.push(
      showPreview
        ? `| ${token.path.join(".")} | ${token.type ?? "—"} | \`${value}\` | ${colorPreview(token, primitives)} | \`--${toWebName(token)}\` |`
        : `| ${token.path.join(".")} | ${token.type ?? "—"} | \`${value}\` | \`--${toWebName(token)}\` |`,
    );
  }
  return lines;
}

function docsModeTable(
  light: FlatToken[],
  dark: FlatToken[],
  primitives: TokenNode,
  title: string,
): string[] {
  const paths = [...new Set([...light, ...dark].map((token) => token.path.join(".")))];
  const byPath = (tokens: FlatToken[], path: string) =>
    tokens.find((token) => token.path.join(".") === path);
  const lines = [
    `## ${title}`,
    "",
    "| Token | Light | Dark | Preview Light | Preview Dark | CSS variable |",
    "| --- | --- | --- | --- | --- | --- |",
  ];
  for (const path of paths) {
    const lightToken = byPath(light, path);
    const darkToken = byPath(dark, path);
    const sample = lightToken ?? darkToken;
    if (!sample) continue;
    lines.push(
      `| ${path} | ${lightToken ? `\`${cssValue(lightToken.value)}\`` : "—"} | ${darkToken ? `\`${cssValue(darkToken.value)}\`` : "—"} | ${lightToken ? colorPreview(lightToken, primitives) : ""} | ${darkToken ? colorPreview(darkToken, primitives) : ""} | \`--${colorRootName(toCssVar(sample.path))}\` |`,
    );
  }
  return lines;
}

/**
 * Builds `output/tokens.md`, the generated token reference: grouped primitive
 * tables with color previews, light/dark comparison tables for semantics and
 * utilities, and the recommended CSS import order.
 *
 * @param primitives - Normalized primitive tokens.
 * @param semanticsLight - Normalized light-mode semantic tokens.
 * @param semanticsDark - Normalized dark-mode semantic tokens.
 * @param utilitiesLight - Normalized light-mode utility tokens.
 * @param utilitiesDark - Normalized dark-mode utility tokens.
 * @returns The markdown document contents.
 */
export function generateTokenDocs(
  primitives: TokenNode,
  semanticsLight: TokenNode,
  semanticsDark: TokenNode,
  utilitiesLight: TokenNode,
  utilitiesDark: TokenNode,
): string {
  const lines = [
    "# Altar Design Tokens",
    "",
    "> Generated by `pnpm --filter=@wedo/altar-design-tokens generate`. Do not edit manually.",
    "",
    "## Web Usage",
    "",
    "```css",
    '@import "@wedo/altar-design-tokens/primitives.css";',
    '@import "@wedo/altar-design-tokens/semantics.css";',
    '@import "@wedo/altar-design-tokens/utilities.css";',
    "```",
    "",
    "Short-form utilities use the semantic group as the Tailwind property namespace,",
    "so there is no doubled prefix:",
    "",
    "- `:root` / `.dark` hold mode-aware runtime values:",
    "  `--color-bg-*`, `--color-text-*`, `--color-border-*`",
    "- `@theme inline` maps Tailwind namespaces grouped per type:",
    "  - `bg-*` ← `--background-color-*` ← `bg.*` (e.g. `bg-brand-primary`)",
    "  - `text-*` ← `--text-color-*` ← `text.*` (e.g. `text-brand-primary`)",
    "  - `border-*` / `ring-*` / `outline-*` / `stroke-*` ← `border.*`",
    "    (e.g. `border-brand-primary`, `ring-brand-primary`, `stroke-brand-primary`)",
    "    — each in its own group but reusing the same `border.*` value so all stay in sync",
    "  - `fill-*` ← `text.*` (e.g. `fill-brand-primary`)",
    "- icons use `text.*` via `currentColor` (e.g. `text-tertiary`)",
    "",
    "## Primitives",
    "",
  ];
  const primitiveGroups = new Map<string, FlatToken[]>();
  for (const token of collectTokens(primitives)) {
    const group = token.path[0] ?? "other";
    primitiveGroups.set(group, [...(primitiveGroups.get(group) ?? []), token]);
  }
  for (const [group, tokens] of primitiveGroups) {
    lines.push(`### ${group}`, "", ...docsTable(tokens, primitives).slice(2), "");
  }
  lines.push(
    ...docsModeTable(
      collectTokens(semanticsLight),
      collectTokens(semanticsDark),
      primitives,
      "Semantics",
    ),
    "",
  );
  lines.push(
    ...docsModeTable(
      collectTokens(utilitiesLight),
      collectTokens(utilitiesDark),
      primitives,
      "Utilities",
    ),
    "",
  );
  return `${lines.join("\n").trimEnd()}\n`;
}

/**
 * Runs the full token build: reads `tokens/*.json`, emits
 * `output/web/primitives.css` (via Style Dictionary), `output/web/semantics.css`,
 * `output/web/utilities.css`, and `output/tokens.md`. Invoked by
 * `pnpm --filter=@wedo/altar-design-tokens generate`; run `sort` first after
 * re-exporting tokens from the authoring tool.
 */
export async function generateTokens(): Promise<void> {
  const primitives = loadTokenFile("primitives.json");
  const light = loadTokenFile("semantics-light.json");
  const dark = loadTokenFile("semantics-dark.json");
  const utilitiesLight = loadTokenFile("utilities-light.json");
  const utilitiesDark = loadTokenFile("utilities-dark.json");

  const config = {
    tokens: primitives,
    platforms: {
      web: {
        log: { warnings: "disabled" },
        buildPath: "output/web/",
        files: [{ destination: "primitives.css", format: "altar/web-primitives" }],
      },
    },
  } as Config;
  await new StyleDictionary(config).buildAllPlatforms();

  mkdirSync(join("output", "web"), { recursive: true });
  writeFileSync(join("output", "web", "semantics.css"), generateSemanticCss(light, dark));
  writeFileSync(
    join("output", "web", "utilities.css"),
    generateModeCss(utilitiesLight, utilitiesDark),
  );
  writeFileSync(
    join("output", "tokens.md"),
    generateTokenDocs(primitives, light, dark, utilitiesLight, utilitiesDark),
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateTokens();
}
