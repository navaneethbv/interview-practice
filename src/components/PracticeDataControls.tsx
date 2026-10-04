"use client";

import { useRef, useState } from "react";
import { BACKUP_LIMIT, exportPractice, importPractice, parseBackup, type PracticeBackup } from "@/lib/practice-backup";
import { downloadText } from "@/lib/download";

const button = "rounded-lg border border-line px-3 py-2 text-sm text-fg-1 hover:bg-layer-2";
export function PracticeDataControls() {
  const [backup, setBackup] = useState<PracticeBackup | null>(null);
  const [message, setMessage] = useState("");
  const confirm = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  function exportData() {
    try {
      downloadText("interview-practice-backup.json", exportPractice(), "application/json");
      setMessage("Backup downloaded. Keep it somewhere safe; it contains your saved code and practice history.");
    } catch (error) { setMessage((error as Error).message); }
  }

  return <details className="mt-8 rounded-xl border border-line bg-layer-1 px-5 py-4">
    <summary className="cursor-pointer text-sm font-medium">Back up or restore practice data</summary>
    <p className="mt-3 text-sm text-fg-2">Save a copy of your code, progress, submissions, and last opened pages. Files stay on your device.</p>
    <div className="mt-3 flex flex-wrap gap-2">
      <button className={button} onClick={exportData}>Export backup</button>
      <label className={`${button} cursor-pointer`}>Choose backup
        <input ref={input} type="file" accept=".json,application/json" aria-label="Choose practice backup" className="mt-2 block max-w-full text-xs" disabled={busy}
          onChange={async (event) => {
            const file = event.currentTarget.files?.[0];
            setBackup(null);
            setMessage("");
            if (!file) return;
            setBusy(true);
            try {
              if (file.size > BACKUP_LIMIT) throw new Error("Backup is too large (maximum 20 MB).");
              setBackup(parseBackup(await file.text()));
              requestAnimationFrame(() => confirm.current?.focus());
            } catch (error) { setMessage((error as Error).message); }
            finally {
              if (input.current) input.current.value = "";
              setBusy(false);
            }
          }} />
      </label>
    </div>
    {backup && <fieldset className="mt-4 rounded-lg border border-line p-3" onKeyDown={(event) => { if (event.key === "Escape") { setBackup(null); input.current?.focus(); } }}>
      <legend className="text-sm font-medium">Confirm restore</legend>
      <p className="text-sm text-fg-2">Restore {Object.keys(backup.entries).length} saved records from {new Date(backup.exportedAt).toLocaleDateString()}? Matching records will be replaced. Other records remain. Export your current data first if you want to keep both versions.</p>
      <div className="mt-3 flex gap-2">
        <button ref={confirm} className={button} onClick={() => {
          try { importPractice(backup); setBackup(null); setMessage("Backup restored. Open a problem to continue with the restored data."); }
          catch (error) { setMessage((error as Error).message); }
          input.current?.focus();
        }}>Restore backup</button>
        <button className={button} onClick={() => { setBackup(null); input.current?.focus(); }}>Cancel</button>
      </div>
    </fieldset>}
    <p role="status" className="mt-3 text-sm text-fg-2">{message}</p>
  </details>;
}
