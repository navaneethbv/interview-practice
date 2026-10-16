"use client";

import { useEffect } from "react";
import { expireMock, useMock } from "@/lib/practice";
import { useProgress } from "@/lib/progress";

/** Keep the deadline effective on every page, after reload, and after device sleep. */
export function MockLifecycle() {
  const { active } = useMock();
  const { log } = useProgress();
  useEffect(() => {
    if (!active) return;
    const check = () => expireMock(log);
    check();
    const timer = window.setInterval(check, 1000);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [active, log]);
  return null;
}
