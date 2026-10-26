# Offline lessons and reader

Use a production build (`npm run build`, `npm start`) over HTTPS or localhost. Development deliberately does not register a worker, avoiding stale development chunks and hot-reload interference.

Open any pattern, system design or business analyst lesson and select **Download lesson**. Downloads are explicit: reading a page alone does not save it. The `/offline` library lists saved pages, opens them with full document navigations, and removes selected downloads. On business analyst pages, the chapter document includes its local lesson navigation; existing local unlock/progress rules continue to apply.

The manifest uses `/offline` as its installed start page. Chromium can expose an Install button when the browser supplies an install prompt. Safari users use Share → Add to Home Screen. Browser-menu instructions remain available when installation prompts are unsupported.

## Cache policy

`public/sw.js` caches only explicitly selected public lesson HTML and same-origin static resources, plus the `/offline` shell. CSS dependencies and already-loaded static resources are included. Assets are limited to Next static bundles, public course images, icons and fonts. The worker never intercepts POST, API/auth/sync/account routes, RSC queries/headers, external origins, or code runner/Monaco/Pyodide resources. No progress, code, notes or private API responses enter Cache Storage.

Downloads have a 25 MB limit, an 8 MB per-resource limit and 180-resource limit; the library holds at most 20 lesson documents and 600 shared resources. Full libraries require explicit removal instead of silently evicting a lesson. Failed fetches do not publish a new lesson entry. Removal deletes its document and shared assets no longer referenced by another download or the offline shell. Browser storage quotas/eviction can still prevent or remove downloads; errors are shown in controls.

Worker updates wait for old tabs to close; no `skipWaiting`, forced reload, or wholesale cache deletion interrupts current reading. Cache schema v1 is shared across worker-code updates so existing saved lessons survive. Re-download a page online to refresh its saved copy. A future incompatible schema migration must migrate existing entries before retiring v1.

Some device voices require a network connection. Offline lesson reading does not guarantee offline speech synthesis or coding execution.

## Reader data and accessibility

Preferences: `ip:reader:v1`, validated by `isReaderPreferences` in `src/lib/reader-data.ts`:

- `fontSize`: 14–28 pixels.
- `lineSpacing`: 1.3–2.4.
- `width`: 32–72 rem.
- `voice`: browser voice URI, at most 300 characters; unavailable voices fall back to the browser default.
- `speed`: 0.5–2, including the existing Slow (0.85×) and Fast (1.2×) options.

Positions: `ip:reader-positions:v1`, validated by `isReaderPositions`. Up to 200 entries use `${pathname}#${targetId}` as lesson identity and `{paragraph, sentence, at}` values. Paragraph/sentence are nonnegative bounded integers. Both manual scrolling and speech advancement save a position. **Resume position** restores the paragraph; **Read from saved position** restores speech. Speech uses browser pause/resume, a generation token rejects canceled callbacks, and current paragraphs are highlighted. Long text is segmented with a bounded linear scanner.

Reader mode inerts siblings along the entire ancestor chain, traps Tab/Shift+Tab within visible reader content, redirects programmatic focus, and restores prior focus on exit. The visible exit button, Escape and right-click all exit. Preferences, speech, positions and downloads remain usable outside reader mode. Browser speech or storage failures degrade independently.

## Verification

`node --import tsx --test src/lib/reader-data.test.ts` verifies backup bounds and identities, full-text speech segmentation with pathological long input, explicit download/CSS dependencies, removal, and the network-only request policy. Browser regression tests in `tests/browser/reader-offline.spec.ts` cover focus restoration, speech cancel generations, preference persistence, mobile layout and production offline round trips.
