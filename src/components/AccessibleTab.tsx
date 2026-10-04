"use client";

import type { ButtonHTMLAttributes, KeyboardEvent } from "react";

function moveTab(event: KeyboardEvent<HTMLButtonElement>) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  const tabs = Array.from(event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? []);
  const index = tabs.indexOf(event.currentTarget);
  if (index < 0) return;
  event.preventDefault();
  let next = event.key === "ArrowLeft" ? (index - 1 + tabs.length) % tabs.length : (index + 1) % tabs.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = tabs.length - 1;
  tabs[next].focus();
  tabs[next].click();
}

export function AccessibleTab({ selected, panelId, ...props }: Readonly<ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean; panelId: string }>) {
  return <button {...props} type="button" role="tab" aria-selected={selected} aria-controls={panelId} tabIndex={selected ? 0 : -1} onKeyDown={moveTab} />;
}
