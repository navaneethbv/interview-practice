"use client";

import { ThemeProvider as NextThemes, useTheme } from "next-themes";
import { Check, Moon, Palette, Sun } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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

const PaletteContext = createContext<Readonly<{
  palette: PaletteId;
  setPalette: (palette: PaletteId) => void;
}>>({ palette: "classic", setPalette: () => {} });

function isPalette(value: string | null): value is PaletteId {
  return PALETTES.some((item) => item.id === value);
}

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [palette, setPalette] = useState<PaletteId>("classic");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isPalette(saved)) setPalette(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.colorTheme = palette;
    window.localStorage.setItem(STORAGE_KEY, palette);
  }, [palette, ready]);

  return (
    <PaletteContext.Provider value={{ palette, setPalette }}>
      <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </NextThemes>
    </PaletteContext.Provider>
  );
}

export function ThemeToggle() {
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
        aria-label="Appearance settings"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Appearance and color themes"
      >
        <Palette size={17} />
      </button>
      {open && (
        <section
          role="dialog"
          aria-label="Appearance settings"
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
