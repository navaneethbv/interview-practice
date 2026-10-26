"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Compass, Lightbulb, Lock, Target, X } from "lucide-react";

const STEPS = [
  {
    icon: <Compass size={22} />,
    tone: "bg-blue-soft text-blue",
    title: "Welcome to Business Analyst Prep",
    body: "This course takes you from the basics to interview-ready, one small step at a time. There are 14 short chapters, and each one is split into bite-size lessons that take a minute or two to read.",
  },
  {
    icon: <BookOpen size={22} />,
    tone: "bg-brand-soft text-brand",
    title: "Read one lesson at a time",
    body: "Open a chapter and you'll see one lesson per page. Each lesson starts with an \"In short\" summary. Press \"Mark as read & continue\" to move on — your place is saved, so you can stop at any time.",
  },
  {
    icon: <Target size={22} />,
    tone: "bg-violet-soft text-violet",
    title: "Pass the quiz to move on",
    body: "When every lesson in a chapter is read, its quiz opens: 10 questions drawn at random from a bank of about 30, with the answers shuffled every time. Score 8 out of 10 to pass. You get an explanation after every question, and you can retry as often as you like.",
  },
  {
    icon: <Lock size={22} />,
    tone: "bg-bad-soft text-bad",
    title: "Chapters unlock in order",
    body: "The next chapter stays locked until you pass the current quiz. After all 14 chapters, the final exam unlocks: 30 questions from across the whole course.",
  },
  {
    icon: <CheckCircle2 size={22} />,
    tone: "bg-ok-soft text-ok",
    title: "Track your progress",
    body: "The progress bar, chapter cards and best scores show how far you've come. Progress is saved in this browser; use the backup buttons at the bottom of the page to move it to another device.",
  },
  {
    icon: <Lightbulb size={22} />,
    tone: "bg-brand-soft text-brand",
    title: "Tips and your own notes",
    body: "Look for the tip of the day, and use the \"My notes\" box in each chapter to write your own examples and interview stories. Notes stay private in this browser. You can replay this tour any time from the course page.",
  },
];

/** A short, step-by-step introduction shown in a dialog. */
export function Tour({ onClose }: Readonly<{ onClose: () => void }>) {
  const [step, setStep] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const s = STEPS[step];
  const last = step === STEPS.length - 1;

  useEffect(() => {
    const el = dialog.current;
    el?.showModal();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setStep((n) => Math.min(n + 1, STEPS.length - 1));
      if (e.key === "ArrowLeft") setStep((n) => Math.max(n - 1, 0));
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      el?.close();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="ba-tour-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-0 grid h-full max-h-none w-full max-w-none place-items-center bg-transparent p-4 text-fg-1 backdrop:bg-neutral-950/50 backdrop:backdrop-blur-sm"
    >
      <button type="button" aria-label="Close tour" tabIndex={-1} onClick={onClose} className="absolute inset-0 cursor-default" />
      <div className="relative w-full max-w-md rounded-2xl border border-line bg-layer-1 p-6 shadow-overlay">
        <button onClick={onClose} aria-label="Close tour" className="absolute top-3 right-3 grid size-8 place-items-center rounded-md text-fg-3 hover:bg-layer-2 hover:text-fg-1">
          <X size={18} />
        </button>
        <span className={`mb-4 grid size-12 place-items-center rounded-2xl ${s.tone}`}>{s.icon}</span>
        <p className="text-xs font-medium text-fg-3">Step {step + 1} of {STEPS.length}</p>
        <h2 id="ba-tour-title" className="mt-1 text-xl font-semibold tracking-tight">{s.title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{s.body}</p>
        <div className="mt-5 flex justify-center gap-1.5" aria-hidden>
          {STEPS.map((_, i) => (
            <span key={STEPS[i].title} className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-fg-1" : "w-1.5 bg-layer-3"}`} />
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-2">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-fg-2 hover:bg-layer-2 disabled:invisible"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={() => (last ? onClose() : setStep(step + 1))}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-fg-1 px-4 text-sm font-medium text-layer-1 hover:opacity-90"
          >
            {last ? "Let's start" : "Next"} {!last && <ArrowRight size={16} />}
          </button>
        </div>
      </div>
    </dialog>
  );
}
