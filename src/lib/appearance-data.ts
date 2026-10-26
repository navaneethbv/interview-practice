export const APPEARANCE_KEY = "ip:appearance:v1";
export const PALETTE_IDS = [
  "classic",
  "ocean",
  "sage",
  "sand",
  "rose",
  "lavender",
] as const;
export type PaletteId = (typeof PALETTE_IDS)[number];
export interface Appearance {
  palette: PaletteId;
  mode: "system" | "light" | "dark";
}
export function isAppearance(value: unknown): value is Appearance {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const candidate = value as Record<string, unknown>;
  return (
    Object.keys(candidate).length === 2 &&
    PALETTE_IDS.includes(candidate.palette as PaletteId) &&
    ["system", "light", "dark"].includes(candidate.mode as string)
  );
}
