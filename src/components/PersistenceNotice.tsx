"use client";

import { useEffect, useState } from "react";
import { pendingWriteCount, retryStorage, usePendingWrites } from "@/lib/storage";
import { downloadText } from "@/lib/download";
import { exportPractice } from "@/lib/practice-backup";

export function PersistenceNotice() {
  const pending = usePendingWrites();
  const [error, setError] = useState("");
  useEffect(() => {
    if (!pending) return;
    const warn = (event: BeforeUnloadEvent) => {
      if (pendingWriteCount()) { event.preventDefault(); event.returnValue = ""; }
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [pending]);
  if (!pending) return null;
  return <aside aria-label="Unsaved practice data" className="fixed right-3 bottom-3 left-3 z-50 mx-auto max-w-xl rounded-xl border border-line-strong bg-layer-1 p-4 shadow-lg">
    <p role="alert" className="text-sm text-fg-1">Browser storage is full or unavailable. Your latest changes are held in this tab only. Save or download them before closing or reloading.</p>
    <div className="mt-2 flex gap-3 text-sm text-blue">
      <button onClick={() => { setError(""); retryStorage(); }} className="hover:underline">Retry saving</button>
      <button onClick={() => {
        try { downloadText("interview-practice-backup.json", exportPractice(), "application/json"); setError(""); }
        catch (e) { setError(`${(e as Error).message} Use Download code in the editor to save the current draft.`); }
      }} className="hover:underline">Export backup</button>
    </div>
    {error && <p role="status" className="mt-2 text-sm text-bad">{error}</p>}
  </aside>;
}
