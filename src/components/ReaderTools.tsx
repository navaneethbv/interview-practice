"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_READER,
  READER_KEY,
  READER_POSITIONS_KEY,
  isReaderPreferences,
  isReaderPositions,
  readerSentences,
  type ReaderPreferences,
  type ReaderPositions,
} from "@/lib/reader-data";
import { safeGet, safeSet } from "@/lib/storage";
import { OfflineDownload } from "./OfflineDownload";
import "./reader.css";

const noop = () => () => {};
const supportedSpeech = () =>
  "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
const serverFalse = () => false;
function storedPreferences() {
  try {
    const v = JSON.parse(safeGet(READER_KEY) ?? "null");
    return isReaderPreferences(v) ? v : DEFAULT_READER;
  } catch {
    return DEFAULT_READER;
  }
}
function storedPositions(): ReaderPositions {
  try {
    const v = JSON.parse(safeGet(READER_POSITIONS_KEY) ?? "null");
    return isReaderPositions(v) ? v : {};
  } catch {
    return {};
  }
}

export function ReaderTools({ targetId }: Readonly<{ targetId: string }>) {
  const [preferences, setPreferences] =
    useState<ReaderPreferences>(DEFAULT_READER);
  const [status, setStatus] = useState<"idle" | "speaking" | "paused">("idle");
  const [readerMode, setReaderMode] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  const supported = useSyncExternalStore(noop, supportedSpeech, serverFalse);
  const controls = useRef<HTMLDivElement>(null);
  const enterButton = useRef<HTMLButtonElement>(null);
  const speechSequence = useRef(0);
  const preferencesRef = useRef(preferences);
  const highlighted = useRef<HTMLElement | null>(null);
  const position = useRef({ paragraph: 0, sentence: 0 });
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const clearHighlight = useCallback(() => {
    highlighted.current?.removeAttribute("data-reading-active");
    highlighted.current = null;
  }, []);
  const stop = useCallback(() => {
    speechSequence.current++;
    if (supportedSpeech()) window.speechSynthesis.cancel();
    utterance.current = null;
    clearHighlight();
    setStatus("idle");
  }, [clearHighlight]);
  const paragraphs = useCallback(() => {
    const target = document.getElementById(targetId);
    return Array.from(
      target?.querySelectorAll<HTMLElement>(
        "h1,h2,h3,h4,p,li,blockquote,pre",
      ) ?? [],
    ).filter(
      (el) => el.innerText.trim() && !el.querySelector("p,li,pre,blockquote"),
    );
  }, [targetId]);
  const savePosition = useCallback(
    (paragraph: number, sentence: number) => {
      position.current = { paragraph, sentence };
      const entries = storedPositions();
      entries[`${window.location.pathname}#${targetId}`] = {
        paragraph,
        sentence,
        at: Date.now(),
      };
      const bounded = Object.fromEntries(
        Object.entries(entries)
          .sort((a, b) => b[1].at - a[1].at)
          .slice(0, 200),
      );
      safeSet(READER_POSITIONS_KEY, JSON.stringify(bounded));
      setResumeAvailable(paragraph > 0 || sentence > 0);
    },
    [targetId],
  );
  useEffect(() => {
    // Hydrate browser-only preferences after the server's stable initial render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPreferences(storedPreferences());
    const saved = storedPositions()[`${window.location.pathname}#${targetId}`];
    if (saved) {
      position.current = saved;
      setResumeAvailable(saved.paragraph > 0 || saved.sentence > 0);
    }
    const refresh = () => {
      if (supportedSpeech()) setVoices(window.speechSynthesis.getVoices());
    };
    const refreshStored = (event: StorageEvent) => {
      if (event.key === null || event.key === READER_KEY)
        setPreferences(storedPreferences());
      if (event.key === null || event.key === READER_POSITIONS_KEY) {
        const saved =
          storedPositions()[`${window.location.pathname}#${targetId}`];
        position.current = saved ?? { paragraph: 0, sentence: 0 };
        setResumeAvailable(
          !!saved && (saved.paragraph > 0 || saved.sentence > 0),
        );
      }
    };
    window.addEventListener("storage", refreshStored);
    refresh();
    if (supportedSpeech())
      window.speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => {
      // This is a speech generation counter, intentionally read at cleanup time.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      speechSequence.current++;
      window.removeEventListener("storage", refreshStored);
      if (supportedSpeech()) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.removeEventListener("voiceschanged", refresh);
      }
      clearHighlight();
    };
  }, [targetId, clearHighlight]);
  useEffect(() => {
    preferencesRef.current = preferences;
    const el = document.getElementById(targetId);
    if (!el) return;
    el.style.setProperty("--reader-font-size", `${preferences.fontSize}px`);
    el.style.setProperty(
      "--reader-line-spacing",
      String(preferences.lineSpacing),
    );
    el.style.setProperty("--reader-width", `${preferences.width}rem`);
  }, [preferences, targetId]);
  const change = (patch: Partial<ReaderPreferences>) => {
    const next = { ...preferences, ...patch };
    preferencesRef.current = next;
    setPreferences(next);
    safeSet(READER_KEY, JSON.stringify(next));
  };
  const start = (resume = false) => {
    if (!supported) return;
    stop();
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    const playbackSequence = speechSequence.current;
    const blocks = paragraphs();
    let paragraph = resume
      ? Math.min(position.current.paragraph, Math.max(0, blocks.length - 1))
      : 0;
    let sentence = resume ? position.current.sentence : 0;
    const next = () => {
      if (playbackSequence !== speechSequence.current) return;
      const block = blocks[paragraph];
      if (!block) {
        utterance.current = null;
        clearHighlight();
        setStatus("idle");
        savePosition(0, 0);
        return;
      }
      const sentences = readerSentences(block.innerText);
      if (sentence >= sentences.length) {
        paragraph++;
        sentence = 0;
        next();
        return;
      }
      clearHighlight();
      highlighted.current = block;
      block.setAttribute("data-reading-active", "true");
      savePosition(paragraph, sentence);
      const speech = new SpeechSynthesisUtterance(sentences[sentence]);
      speech.rate = preferencesRef.current.speed;
      speech.voice =
        window.speechSynthesis
          .getVoices()
          .find((v) => v.voiceURI === preferencesRef.current.voice) ?? null;
      speech.onend = () => {
        if (playbackSequence !== speechSequence.current) return;
        sentence++;
        next();
      };
      speech.onerror = () => {
        if (playbackSequence === speechSequence.current) {
          utterance.current = null;
          clearHighlight();
          setStatus("idle");
        }
      };
      utterance.current = speech;
      window.speechSynthesis.speak(speech);
    };
    setStatus("speaking");
    next();
  };
  useEffect(() => {
    if (!readerMode) return;
    const page = controls.current?.closest<HTMLElement>(".reader-page");
    if (!page) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const inerted: { el: HTMLElement; inert: boolean }[] = [];
    let node: HTMLElement | null = page;
    while (node?.parentElement) {
      for (const sibling of Array.from(node.parentElement.children))
        if (sibling !== node && sibling instanceof HTMLElement) {
          inerted.push({ el: sibling, inert: sibling.inert });
          sibling.inert = true;
        }
      node = node.parentElement;
    }
    const oldRole = page.getAttribute("role");
    const oldModal = page.getAttribute("aria-modal");
    page.setAttribute("role", "dialog");
    page.setAttribute("aria-modal", "true");
    page.setAttribute("aria-label", "Lesson reader");
    document.documentElement.classList.add("reader-mode-active");
    enterButton.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setReaderMode(false);
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        page.querySelectorAll<HTMLElement>(
          'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]',
        ),
      ).filter(
        (el) =>
          el.getClientRects().length &&
          getComputedStyle(el).visibility !== "hidden",
      );
      const index = focusable.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) {
        event.preventDefault();
        focusable.at(-1)?.focus();
      } else if (
        !event.shiftKey &&
        (index < 0 || index === focusable.length - 1)
      ) {
        event.preventDefault();
        focusable[0]?.focus();
      }
    };
    const context = (event: MouseEvent) => {
      event.preventDefault();
      setReaderMode(false);
    };
    const focusin = (event: FocusEvent) => {
      if (!page.contains(event.target as Node)) enterButton.current?.focus();
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("contextmenu", context);
    document.addEventListener("focusin", focusin);
    return () => {
      document.documentElement.classList.remove("reader-mode-active");
      inerted.forEach(({ el, inert }) => {
        el.inert = inert;
      });
      if (oldRole) page.setAttribute("role", oldRole);
      else page.removeAttribute("role");
      if (oldModal) page.setAttribute("aria-modal", oldModal);
      else page.removeAttribute("aria-modal");
      page.removeAttribute("aria-label");
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("contextmenu", context);
      document.removeEventListener("focusin", focusin);
      previousFocus?.focus();
    };
  }, [readerMode]);
  useEffect(() => {
    const target = document.getElementById(targetId);
    const container = target?.closest<HTMLElement>(".reader-page");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const remember = () => {
      if (utterance.current) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (utterance.current) return;
        const blocks = paragraphs();
        const top = document.documentElement.classList.contains(
          "reader-mode-active",
        )
          ? (container?.getBoundingClientRect().top ?? 0) + 130
          : 100;
        let closest = -1;
        let distance = Infinity;
        blocks.forEach((block, index) => {
          const rect = block.getBoundingClientRect();
          if (rect.bottom < top || rect.top > window.innerHeight) return;
          const delta = Math.abs(rect.top - top);
          if (delta < distance) {
            closest = index;
            distance = delta;
          }
        });
        if (closest >= 0) savePosition(closest, 0);
      }, 250);
    };
    window.addEventListener("scroll", remember, { passive: true });
    container?.addEventListener("scroll", remember, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", remember);
      container?.removeEventListener("scroll", remember);
    };
  }, [targetId, paragraphs, savePosition]);
  const resumeReading = () => {
    paragraphs()[position.current.paragraph]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  const togglePlayback = () => {
    if (status === "idle") {
      start();
    } else if (status === "speaking") {
      window.speechSynthesis.pause();
      setStatus("paused");
    } else {
      window.speechSynthesis.resume();
      setStatus("speaking");
    }
  };
  const playbackLabels = { idle: "Read aloud", speaking: "Pause", paused: "Resume audio" };
  const playbackMessages = {
    idle: "Reading position is saved as you scroll or audio advances.",
    speaking: "Reading aloud. The current paragraph is highlighted.",
    paused: "Audio paused.",
  };
  const playbackMessage = supported ? playbackMessages[status] : "Read aloud is unavailable in this browser. Reading preferences still work.";
  return (
    <div
      ref={controls}
      data-reader-controls
      className="reader-tools mb-5 rounded-xl border border-line bg-layer-2 px-3 py-3"
    >
      <div className="flex flex-wrap items-center gap-2">
        <button type="button"
          className="reader-button"
          disabled={!supported}
          onClick={togglePlayback}
        >
          {playbackLabels[status]}
        </button>
        {status !== "idle" && (
          <button type="button" className="reader-button" onClick={stop}>
            Stop
          </button>
        )}
        {resumeAvailable && (
          <>
            <button type="button" className="reader-button" onClick={resumeReading}>
              Resume position
            </button>
            {supported && (
              <button type="button" className="reader-button" onClick={() => start(true)}>
                Read from saved position
              </button>
            )}
          </>
        )}
        <button type="button"
          ref={enterButton}
          className="reader-button"
          aria-pressed={readerMode}
          onClick={() => setReaderMode(!readerMode)}
        >
          {readerMode ? "Exit reader mode" : "Reader mode"}
        </button>
        <OfflineDownload />
      </div>
      <div className="reader-preferences">
        <label>
          <span>Text size</span>
          <select
            value={preferences.fontSize}
            onChange={(e) => change({ fontSize: Number(e.target.value) })}
          >
            {[14, 16, 18, 20, 24, 28].map((n) => (
              <option key={n} value={n}>
                {n}px
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Line spacing</span>
          <select
            value={preferences.lineSpacing}
            onChange={(e) => change({ lineSpacing: Number(e.target.value) })}
          >
            {[1.3, 1.5, 1.8, 2, 2.4].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Reading width</span>
          <select
            value={preferences.width}
            onChange={(e) => change({ width: Number(e.target.value) })}
          >
            {[
              [32, "Narrow"],
              [48, "Comfortable"],
              [72, "Wide"],
            ].map(([n, label]) => (
              <option key={n} value={n}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Voice</span>
          <select
            disabled={!supported}
            value={preferences.voice}
            onChange={(e) => change({ voice: e.target.value })}
          >
            <option value="">Browser default</option>
            {voices.map((v) => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Speed</span>
          <select
            value={preferences.speed}
            onChange={(e) => change({ speed: Number(e.target.value) })}
          >
            {[
              [0.5, "0.5×"],
              [0.85, "Slow · 0.85×"],
              [1, "1×"],
              [1.2, "Fast · 1.2×"],
              [1.5, "1.5×"],
              [2, "2×"],
            ].map(([n, label]) => (
              <option key={n} value={n}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <output className="mt-2 block text-xs text-fg-3">
        {playbackMessage}
        {readerMode && " Press Escape or right-click to exit."}
      </output>
    </div>
  );
}
