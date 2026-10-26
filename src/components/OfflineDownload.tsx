"use client";
import { useState } from "react";
import { offlineMessage } from "@/lib/reader-offline";
export function OfflineDownload() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const download = async () => {
    setBusy(true);
    setMessage("Downloading lesson and its assets…");
    try {
      await offlineMessage("DOWNLOAD", {
        path: window.location.pathname,
        assets: performance
          .getEntriesByType("resource")
          .map((entry) => {
            try {
              const url = new URL(entry.name);
              return url.origin === window.location.origin ? url.pathname : "";
            } catch {
              return "";
            }
          })
          .filter(Boolean),
      });
      setMessage(
        "Lesson saved. Open it from the offline library when disconnected.",
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not save this lesson.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <button
        type="button"
        className="reader-button"
        disabled={busy}
        onClick={download}
      >
        {busy ? "Saving…" : "Download lesson"}
      </button>
      {message && (
        <span className="w-full text-xs text-fg-3" role="status">
          {message}{" "}
          <a className="underline" href="/offline">
            Offline library
          </a>
        </span>
      )}
    </>
  );
}
