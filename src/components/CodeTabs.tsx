"use client";

import { Check, Copy } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import type { CodeLang } from "@/lib/content-types";
import { loadPrefs, savePrefs } from "@/lib/progress";

const LABEL: Record<CodeLang, string> = { python: "Python", java: "Java", sql: "SQLite" };

/* A tiny shared store so every code block on the page follows the chosen language. */
const langListeners = new Set<() => void>();
let currentLang: CodeLang | null = null;
function getLang(): CodeLang {
  currentLang ??= loadPrefs().lang;
  return currentLang;
}
export function setPreferredLang(lang: CodeLang) {
  currentLang = lang;
  savePrefs({ lang });
  langListeners.forEach((l) => l());
}
function subscribe(cb: () => void) {
  langListeners.add(cb);
  return () => {
    langListeners.delete(cb);
  };
}

export function usePreferredLang(): CodeLang {
  return useSyncExternalStore(subscribe, getLang, () => "python" as CodeLang);
}

/** Raw source used by the copy button for each rendered language. */
const SOURCE_PROP = { java: "javaSrc", python: "pythonSrc", sql: "sqlSrc" } as const;

export function CodeTabs(props: Readonly<{ java?: string; python?: string; sql?: string; javaSrc?: string; pythonSrc?: string; sqlSrc?: string }>) {
  const preferred = usePreferredLang();
  const [copied, setCopied] = useState(false);
  const available = (["python", "java", "sql"] as const).filter((l) => props[l]);
  if (!available.length) return null;
  const lang = available.includes(preferred) ? preferred : available[0];
  const src = props[SOURCE_PROP[lang]];

  async function copy() {
    try {
      await navigator.clipboard.writeText(src ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked; nothing else to do.
    }
  }

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-line bg-code">
      <div className="flex items-center gap-1 border-b border-line bg-layer-1 px-2 py-1">
        <div role="tablist" aria-label="Code language" className="flex gap-1">
          {available.map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={l === lang}
              onClick={() => setPreferredLang(l)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                l === lang ? "bg-layer-2 text-fg-1" : "text-fg-3 hover:text-fg-1"
              }`}
            >
              {LABEL[l]}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="ml-auto grid size-7 place-items-center rounded-md text-fg-3 hover:bg-layer-2 hover:text-fg-1"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-ok" /> : <Copy size={14} />}
        </button>
      </div>
      <div
        className="overflow-x-auto px-4 py-3 text-[13px] leading-6 [&_code]:!border-0 [&_code]:!bg-transparent [&_code]:!p-0 [&_code]:!text-[13px] [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: props[lang]! }}
      />
    </div>
  );
}
