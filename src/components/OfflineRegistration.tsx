"use client";
import { useEffect } from "react";
export function OfflineRegistration() {
  useEffect(() => {
    if (
      "serviceWorker" in navigator &&
      window.isSecureContext &&
      process.env.NODE_ENV === "production"
    ) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => {
          /* Controls explain unsupported/unavailable storage. */
        });
    }
  }, []);
  return null;
}
