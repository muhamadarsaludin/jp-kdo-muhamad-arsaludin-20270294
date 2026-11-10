/**
 * Returns initials for a name to display inside avatars, chips, etc.
 *
 * Rules:
 * - Empty/whitespace-only name → `""`.
 * - One word → first letter of that word.
 * - Two or three words → first letter of the first and last words.
 * - Four or more words → letters of the first two words.
 * All returned letters are uppercase.
 *
 * @param name - Full name (or display name) of a person/entity.
 * @returns Up to two uppercase letters.
 *
 * @example
 * getInitials("Arsal") // "A"
 * getInitials("John Doe") // "JD"
 * getInitials("John Michael Doe") // "JD"
 * getInitials("John Michael Doe Smith") // "JM"
 */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return "";
  }

  const firstLetter = (word: string) => word.charAt(0).toUpperCase();

  if (words.length === 1) {
    return firstLetter(words[0] ?? "");
  }

  if (words.length <= 3) {
    return firstLetter(words[0] ?? "") + firstLetter(words[words.length - 1] ?? "");
  }

  return firstLetter(words[0] ?? "") + firstLetter(words[1] ?? "");
}
