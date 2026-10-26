"use client";
import { useEffect, useState } from "react";
import { offlineMessage, type OfflineLesson } from "@/lib/reader-offline";

type InstallPrompt = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: string }>;
};
export function OfflineLibrary() {
  const [lessons, setLessons] = useState<OfflineLesson[]>([]);
  const [message, setMessage] = useState("Loading saved lessons…");
  const [install, setInstall] = useState<InstallPrompt | null>(null);
  const [busy, setBusy] = useState(false);
  const refresh = () =>
    offlineMessage<OfflineLesson[]>("LIST")
      .then((data) => {
        setLessons(data);
        setMessage(
          data.length
            ? ""
            : "No downloads yet. Open a lesson online and choose Download lesson.",
        );
      })
      .catch((error) => setMessage(error.message));
  useEffect(() => {
    void refresh();
    const prompt = (event: Event) => {
      event.preventDefault();
      setInstall(event as InstallPrompt);
    };
    window.addEventListener("beforeinstallprompt", prompt);
    return () => window.removeEventListener("beforeinstallprompt", prompt);
  }, []);
  const remove = async (path: string) => {
    setBusy(true);
    try {
      await offlineMessage("DELETE", { path });
      await refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not remove lesson.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <>
      <p className="mb-5 text-fg-2">
        Download lessons while connected, then read them here offline. Downloads
        include lesson text, images, fonts, and the page interface. Coding
        execution and cloud services need a connection.
      </p>
      <p role="status" className="my-3 text-sm text-fg-3">
        {message}
      </p>
      <ul className="space-y-3">
        {lessons.map((lesson) => (
          <li
            key={lesson.path}
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4"
          >
            <div className="min-w-0">
              <a href={lesson.path} className="font-medium underline">
                {lesson.title}
              </a>
              <p className="mt-1 text-xs text-fg-3">
                Saved {new Date(lesson.savedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              type="button"
              disabled={busy}
              className="rounded-lg border border-line px-3 py-2 text-sm"
              onClick={() => remove(lesson.path)}
            >
              Remove download<span className="sr-only">: {lesson.title}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-xl border border-line p-5">
        <h2 className="text-lg font-semibold">Install on your device</h2>
        {install && (
          <button type="button"
            className="mt-3 rounded-lg border border-line px-4 py-2"
            onClick={async () => {
              await install.prompt();
              await install.userChoice;
              setInstall(null);
            }}
          >
            Install Interview Practice
          </button>
        )}
        <p className="mt-3 text-sm text-fg-2">
          On iPhone or iPad, open this site in Safari, choose Share, then Add to
          Home Screen. On Android or desktop, use your browser’s Install app or
          Add to Home Screen menu when available. Installation requires HTTPS
          (or localhost).
        </p>
        <p className="mt-3 text-sm text-fg-3">
          Keep this page bookmarked if your browser does not support
          installation. Browser storage can be cleared by the device; your saved
          practice progress is separate from lesson downloads. Up to 20 lessons
          can be saved. Remove older downloads to make room.
        </p>
        <button type="button"
          className="mt-3 rounded-lg border border-line px-3 py-2 text-sm"
          disabled={busy}
          onClick={() => {
            void refresh();
          }}
        >
          Refresh downloads
        </button>
      </div>
    </>
  );
}
