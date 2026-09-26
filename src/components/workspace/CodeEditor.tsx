"use client";

import Editor, { type BeforeMount, type OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import type { CodeLang } from "@/lib/content-types";

const defineThemes: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("ip-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "7f8490", fontStyle: "italic" },
      { token: "keyword", foreground: "d19bf0" },
      { token: "string", foreground: "a8d58b" },
      { token: "number", foreground: "f5b36b" },
      { token: "type", foreground: "7cc7e8" },
      { token: "type.identifier", foreground: "7cc7e8" },
    ],
    colors: {
      "editor.background": "#212226",
      "editor.foreground": "#dcdde2",
      "editor.lineHighlightBackground": "#2a2b30",
      "editor.lineHighlightBorder": "#00000000",
      "editorLineNumber.foreground": "#5b5f68",
      "editorLineNumber.activeForeground": "#a9acb4",
      "editorGutter.background": "#212226",
      "editor.selectionBackground": "#3b4a63",
      "editorIndentGuide.background1": "#2f3136",
      "editorCursor.foreground": "#f2a93b",
      "scrollbarSlider.background": "#41444b88",
    },
  });
  monaco.editor.defineTheme("ip-light", {
    base: "vs",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8a8f98", fontStyle: "italic" },
      { token: "keyword", foreground: "8839c4" },
      { token: "string", foreground: "2f7d32" },
      { token: "number", foreground: "b35c00" },
      { token: "type", foreground: "1c6aa8" },
      { token: "type.identifier", foreground: "1c6aa8" },
    ],
    colors: {
      "editor.background": "#ffffff",
      "editor.lineHighlightBackground": "#f5f6f8",
      "editor.lineHighlightBorder": "#00000000",
      "editorLineNumber.foreground": "#b3b7bf",
      "editorLineNumber.activeForeground": "#565b63",
      "editorIndentGuide.background1": "#eceef1",
      "editorCursor.foreground": "#e8930c",
    },
  });
};

/** next/font registers a hashed family name; Monaco needs the resolved name, not a CSS variable. */
function editorFont() {
  if (typeof document === "undefined") return "monospace";
  return getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim() || "monospace";
}

export interface CodeEditorProps {
  value: string;
  lang: CodeLang;
  fontSize: number;
  onChange: (value: string) => void;
  onRun: () => void;
  onSubmit: () => void;
}

export function CodeEditor({ value, lang, fontSize, onChange, onRun, onSubmit }: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  // Keep the latest callbacks for the keybindings registered once on mount.
  const actions = useRef({ onRun, onSubmit });
  useEffect(() => {
    actions.current = { onRun, onSubmit };
  }, [onRun, onSubmit]);

  const onMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Quote, () => actions.current.onRun());
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => actions.current.onSubmit());
  };

  return (
    <Editor
      height="100%"
      language={lang}
      value={value}
      theme={resolvedTheme === "dark" ? "ip-dark" : "ip-light"}
      beforeMount={defineThemes}
      onMount={onMount}
      onChange={(v) => onChange(v ?? "")}
      loading={<div className="p-4 text-sm text-fg-3">Loading editor…</div>}
      options={{
        fontSize,
        fontFamily: `${editorFont()}, ui-monospace, Menlo, monospace`,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        tabSize: 4,
        insertSpaces: true,
        automaticLayout: true,
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: "all",
        smoothScrolling: true,
        cursorBlinking: "smooth",
        bracketPairColorization: { enabled: true },
        lineNumbersMinChars: 3,
        overviewRulerLanes: 0,
        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
        fixedOverflowWidgets: true,
      }}
    />
  );
}
