export type OfflineLesson = {
  path: string;
  title: string;
  savedAt: number;
  assets: string[];
};
export async function offlineWorker(): Promise<ServiceWorker> {
  if (!("serviceWorker" in navigator) || !window.isSecureContext)
    throw new Error(
      "Offline lessons need a secure browser with service worker support.",
    );
  if (process.env.NODE_ENV !== "production")
    throw new Error(
      "Offline downloads are available in the production build. Use npm run build and npm start to try them locally.",
    );
  const registration = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
    updateViaCache: "none",
  });
  const ready = registration.active
    ? registration
    : await Promise.race([
        navigator.serviceWorker.ready,
        new Promise<never>((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Offline setup is taking too long. Try again after reloading.",
                ),
              ),
            20000,
          ),
        ),
      ]);
  if (!ready.active)
    throw new Error("Offline setup is not ready. Please try again.");
  return ready.active;
}
export async function offlineMessage<T>(
  type: string,
  payload: Record<string, unknown> = {},
): Promise<T> {
  const worker = await offlineWorker();
  return new Promise<T>((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = setTimeout(() => {
      channel.port1.close();
      reject(
        new Error(
          "Offline request timed out. Check your connection and try again.",
        ),
      );
    }, 90000);
    channel.port1.onmessage = (event) => {
      clearTimeout(timeout);
      channel.port1.close();
      if (event.data.error) reject(new Error(event.data.error));
      else resolve(event.data.result as T);
    };
    worker.postMessage({ type, ...payload }, [channel.port2]);
  });
}
