export const READER_KEY = "ip:reader:v1";
export const READER_POSITIONS_KEY = "ip:reader-positions:v1";
export type ReaderPreferences = {
  fontSize: number;
  lineSpacing: number;
  width: number;
  voice: string;
  speed: number;
};
export type ReaderPosition = {
  paragraph: number;
  sentence: number;
  at: number;
};
export type ReaderPositions = Record<string, ReaderPosition>;
export const DEFAULT_READER: ReaderPreferences = {
  fontSize: 18,
  lineSpacing: 1.8,
  width: 48,
  voice: "",
  speed: 0.85,
};
const record = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === "object" && !Array.isArray(v);
const range = (v: unknown, min: number, max: number) =>
  typeof v === "number" && Number.isFinite(v) && v >= min && v <= max;
export function isReaderPreferences(v: unknown): v is ReaderPreferences {
  return (
    record(v) &&
    range(v.fontSize, 14, 28) &&
    range(v.lineSpacing, 1.3, 2.4) &&
    range(v.width, 32, 72) &&
    typeof v.voice === "string" &&
    v.voice.length <= 300 &&
    range(v.speed, 0.5, 2)
  );
}
export function isReaderPositions(v: unknown): v is ReaderPositions {
  return (
    record(v) &&
    Object.keys(v).length <= 200 &&
    Object.entries(v).every(
      ([key, p]) =>
        /^\/(learn|system-design|business-analyst|behavioral|ba)\/[a-zA-Z0-9/_-]+(?:#[a-zA-Z0-9_-]+)?$/.test(
          key,
        ) &&
        key.length <= 300 &&
        record(p) &&
        Number.isInteger(p.paragraph) &&
        range(p.paragraph, 0, 100000) &&
        Number.isInteger(p.sentence) &&
        range(p.sentence, 0, 100000) &&
        range(p.at, 0, 1e15),
    )
  );
}
/** Linear scan; no sentence regex/backtracking even for punctuation-only or huge input. */
export function readerSentences(text: string): string[] {
  const parts: string[] = [];
  let start = 0;
  let lastSpace = -1;
  const whitespace = (character: string | undefined) =>
    character === " " ||
    character === "\n" ||
    character === "\r" ||
    character === "\t";
  const append = (end: number) => {
    const part = text.slice(start, end).trim();
    if (part) parts.push(part);
    start = end;
    lastSpace = -1;
  };
  let index = 0;
  while (index < text.length) {
    if (whitespace(text[index])) lastSpace = index;
    const sentenceEnd =
      ".!?".includes(text[index]) &&
      (index + 1 === text.length || whitespace(text[index + 1]));
    if (sentenceEnd) append(index + 1);
    else if (index - start >= 219) {
      const end = lastSpace > start + 60 ? lastSpace : index + 1;
      append(end);
      index = end;
      continue;
    }
    index++;
  }
  append(text.length);
  return parts;
}
