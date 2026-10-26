"use client";

import { BookOpen, Pause, Volume2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Speed = "slow" | "fast";

const SPEED_RATE: Record<Speed, number> = { slow: 0.85, fast: 1.2 };

function speechChunks(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];
  const chunks: string[] = [];

  for (const sentence of sentences) {
    let remainder = sentence.trim();
    while (remainder.length > 180) {
      let splitAt = remainder.lastIndexOf(" ", 180);
      if (splitAt < 60) splitAt = 180;
      chunks.push(remainder.slice(0, splitAt).trim());
      remainder = remainder.slice(splitAt).trim();
    }
    if (remainder) chunks.push(remainder);
  }

  return chunks;
}

/** Reading controls for lesson pages: browser speech, speed selection, and a focused reader view. */
export function ReaderTools({ targetId }: Readonly<{ targetId: string }>) {
  const [speed, setSpeed] = useState<Speed>("slow");
  const [speaking, setSpeaking] = useState(false);
  const [readerMode, setReaderMode] = useState(false);
  const [supported, setSupported] = useState(false);
  const rateRef = useRef(SPEED_RATE.slow);
  const chunksRef = useRef<string[]>([]);

  useEffect(() => {
    setSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    chunksRef.current = [];
    setSpeaking(false);
  }, []);

  const startSpeaking = useCallback(() => {
    const text = document.getElementById(targetId)?.innerText?.replace(/\s+/g, " ").trim();
    if (!text || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    window.speechSynthesis.cancel();
    chunksRef.current = speechChunks(text);
    setSpeaking(true);

    let index = 0;
    const speakNext = () => {
      const chunk = chunksRef.current[index++];
      if (!chunk) {
        setSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = rateRef.current;
      utterance.onend = speakNext;
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };
    speakNext();
  }, [targetId]);

  const leaveReaderMode = useCallback(() => {
    document.documentElement.classList.remove("reader-mode-active");
    setReaderMode(false);
  }, []);

  useEffect(() => {
    if (!readerMode) return;
    document.documentElement.classList.add("reader-mode-active");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") leaveReaderMode();
    };
    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      leaveReaderMode();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("contextmenu", onContextMenu);
    return () => {
      document.documentElement.classList.remove("reader-mode-active");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("contextmenu", onContextMenu);
    };
  }, [readerMode, leaveReaderMode]);

  useEffect(() => () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    document.documentElement.classList.remove("reader-mode-active");
  }, []);

  const chooseSpeed = (next: Speed) => {
    rateRef.current = SPEED_RATE[next];
    setSpeed(next);
  };

  return (
    <div data-reader-controls className="reader-tools mb-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-layer-2/70 px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={speaking ? stopSpeaking : startSpeaking}
          disabled={!supported}
          title={supported ? (speaking ? "Stop reading aloud" : "Read this lesson aloud") : "Read aloud is not supported in this browser"}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-fg-1 px-3 text-sm font-medium text-layer-1 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {speaking ? <Pause size={15} /> : <Volume2 size={15} />}
          {speaking ? "Stop" : "Read aloud"}
        </button>
        <div className="inline-flex items-center rounded-lg border border-line bg-layer-1 p-0.5" role="group" aria-label="Read aloud speed">
          {(["slow", "fast"] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={speed === option}
              onClick={() => chooseSpeed(option)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium capitalize transition-colors ${speed === option ? "bg-layer-3 text-fg-1" : "text-fg-3 hover:text-fg-1"}`}
            >
              {option} <span className="text-fg-3">{SPEED_RATE[option]}×</span>
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => readerMode ? leaveReaderMode() : setReaderMode(true)}
        aria-pressed={readerMode}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-layer-1 px-3 text-sm font-medium text-fg-2 transition-colors hover:bg-layer-2 hover:text-fg-1"
        title="Press Escape or right-click to exit reader mode"
      >
        <BookOpen size={15} />
        {readerMode ? "Exit reader mode" : "Reader mode"}
      </button>
      <span className="sr-only" aria-live="polite">
        {speaking ? `Reading aloud at ${speed} speed.` : ""}
      </span>
    </div>
  );
}
