"use client";

import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

type PaletteId = "classic" | "ocean" | "sage" | "sand" | "rose" | "lavender";
type PaletteOption = Readonly<{ id: PaletteId; light: string; dark: string; swatch: string }>;

const PALETTES: PaletteOption[] = [
  { id: "classic", light: "Classic", dark: "Graphite", swatch: "#e8930c" },
  { id: "ocean", light: "Ocean", dark: "Midnight", swatch: "#3478b8" },
  { id: "sage", light: "Sage", dark: "Pine", swatch: "#56816b" },
  { id: "sand", light: "Sand", dark: "Mocha", swatch: "#ad7c55" },
  { id: "rose", light: "Rose", dark: "Berry", swatch: "#a45e76" },
  { id: "lavender", light: "Lavender", dark: "Amethyst", swatch: "#7763b7" },
];
const STORAGE_KEY = "interview-practice-color-theme";
const PALETTE_CHANGE_EVENT = "interview-practice:color-theme-change";

function isPalette(value: string | null): value is PaletteId {
  return PALETTES.some((item) => item.id === value);
}

function subscribeToPalette(callback: () => void) {
  window.addEventListener(PALETTE_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PALETTE_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getPaletteSnapshot(): PaletteId {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return isPalette(saved) ? saved : "classic";
}

function getPaletteServerSnapshot(): PaletteId {
  return "classic";
}

function savePalette(palette: PaletteId) {
  window.localStorage.setItem(STORAGE_KEY, palette);
  document.documentElement.dataset.colorTheme = palette;
  window.dispatchEvent(new Event(PALETTE_CHANGE_EVENT));
}

const PaletteContext = createContext<Readonly<{
  palette: PaletteId;
  setPalette: (palette: PaletteId) => void;
}>>({ palette: "classic", setPalette: savePalette });

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const palette = useSyncExternalStore(subscribeToPalette, getPaletteSnapshot, getPaletteServerSnapshot);

  useEffect(() => {
    document.documentElement.dataset.colorTheme = palette;
  }, [palette]);

  const contextValue = useMemo(() => ({ palette, setPalette: savePalette }), [palette]);

  return (
    <PaletteContext.Provider value={contextValue}>
      <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </NextThemes>
    </PaletteContext.Provider>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid size-8 shrink-0 place-items-center rounded-md text-fg-2 transition-colors hover:bg-layer-2 hover:text-fg-1"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function ColorThemePicker() {
  const { resolvedTheme, setTheme } = useTheme();
  const { palette, setPalette } = useContext(PaletteContext);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const dark = resolvedTheme === "dark";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="grid size-8 shrink-0 place-items-center rounded-md text-fg-2 transition-colors hover:bg-layer-2 hover:text-fg-1"
        aria-label="Choose color theme"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Choose a color theme"
      >
        <Palette size={17} />
      </button>
      {open && (
        <section
          role="dialog"
          aria-label="Color themes"
          className="absolute top-full right-0 z-[70] mt-2 w-72 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-line bg-layer-1 p-3 shadow-overlay"
        >
          <p className="px-1 pb-2 text-sm font-semibold">Appearance</p>
          <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl bg-layer-2 p-1" role="group" aria-label="Color mode">
            <button
              type="button"
              aria-pressed={!dark}
              onClick={() => setTheme("light")}
              className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors ${!dark ? "bg-layer-1 text-fg-1 shadow-card" : "text-fg-3 hover:text-fg-1"}`}
            >
              <Sun size={15} /> Light
            </button>
            <button
              type="button"
              aria-pressed={dark}
              onClick={() => setTheme("dark")}
              className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors ${dark ? "bg-layer-1 text-fg-1 shadow-card" : "text-fg-3 hover:text-fg-1"}`}
            >
              <Moon size={15} /> Dark
            </button>
          </div>
          <p className="px-1 pb-2 text-xs font-medium text-fg-3">{dark ? "Dark themes" : "Light themes"}</p>
          <div className="grid grid-cols-2 gap-1.5">
            {PALETTES.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={palette === item.id}
                onClick={() => setPalette(item.id)}
                className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors ${palette === item.id ? "border-brand bg-brand-soft text-fg-1" : "border-transparent text-fg-2 hover:bg-layer-2"}`}
              >
                <span className="size-3.5 shrink-0 rounded-full ring-1 ring-black/10" style={{ backgroundColor: item.swatch }} aria-hidden />
                <span className="min-w-0 flex-1 truncate">{dark ? item.dark : item.light}</span>
                {palette === item.id && <Check size={14} className="shrink-0 text-brand" aria-hidden />}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
