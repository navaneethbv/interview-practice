/* Offline public lessons only. No API, authentication, sync, runner, POST, or user-state caching. */
const CACHE_PREFIX = "ip-offline-";
const DOCS = `${CACHE_PREFIX}documents-v1`;
const ASSETS = `${CACHE_PREFIX}assets-v1`;
const INDEX = `${CACHE_PREFIX}index-v1`;
const MAX_LESSONS = 20;
const MAX_ASSETS = 600;
const MAX_DOWNLOAD_BYTES = 25 * 1024 * 1024;
const MAX_ASSET_BYTES = 8 * 1024 * 1024;
const SHELL = "/offline";
const ALLOWED_ORIGINS = new Set([self.location.origin]);
const blocked = pathname => /(?:^|\/)(?:api|auth|sync|login|logout|account|settings)(?:\/|$)/.test(pathname) || /(?:worker|runner|pyodide|monaco)/i.test(pathname);
const lessonPath = pathname => /^\/learn\/[a-zA-Z0-9_-]+$/.test(pathname) || /^\/system-design\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(pathname) || /^\/business-analyst\/(?:senior\/)?[a-zA-Z0-9_-]+$/.test(pathname) && !/\/(final|study-plan)$/.test(pathname);
const assetPath = pathname => !blocked(pathname) && (pathname.startsWith("/_next/static/") || /^\/(?:course-assets|system-design|icons|images)\/.+\.(?:png|jpe?g|webp|avif|gif|svg|woff2?|css|js)$/i.test(pathname) || pathname === "/favicon.ico" || pathname === "/manifest.webmanifest");
const keyFor = path => new Request(new URL(path, self.location.origin));

/** Downloads accept canonical root-relative public paths, never arbitrary URLs. */
function downloadURL(path, kind) {
  const message = kind === "asset" ? "Invalid lesson asset URL." : "Only public lesson pages can be downloaded.";
  if (typeof path !== "string" || path.length > 2048 || !path.startsWith("/") || path.startsWith("//") || /[\\%?#\s]/.test(path)) throw new Error(message);
  // Fix the authority before assigning the validated path: input cannot select a host.
  const url = new URL(self.location.origin);
  url.pathname = path;
  if (url.origin !== self.location.origin || url.username || url.password || url.search || url.hash || url.pathname !== path) throw new Error(message);
  const allowed = kind === "asset" ? assetPath(url.pathname) : lessonPath(url.pathname) || kind === "shell" && url.pathname === SHELL;
  if (!allowed) throw new Error(message);
  return url;
}

/** All network requests share the same explicit authority and credential policy. */
async function fetchPublic(url, options = {}) {
  if (ALLOWED_ORIGINS.has(url.origin)) {
    try {
      const request = new Request(url, { ...options, method: "GET", credentials: "omit", redirect: "error" });
      return await fetch(request);
    } catch (error) {
      throw new Error("Could not fetch the public lesson resource.", { cause: error });
    }
  }
  throw new Error("Only same-origin public lesson resources can be fetched.");
}

// Decode each original entity exactly once; nested entities stay encoded.
function decodeEntities(text) {
  const entities = new Map([["&amp;", "&"], ["&#x27;", "'"], ["&quot;", '"']]);
  return text.replace(/&(?:amp|#x27|quot);/g, entity => entities.get(entity) ?? entity);
}
async function entries() {
  try {
    const cache = await caches.open(INDEX);
    const response = await cache.match(keyFor("/__offline_index__"));
    if (!response) return [];
    const value = await response.json();
    if (!Array.isArray(value)) throw new Error("Invalid offline index.");
    return value;
  } catch (error) {
    // A failed/corrupt read must never be treated as an empty library and overwritten.
    throw new Error("Could not read the offline library. Existing downloads were preserved.", { cause: error });
  }
}
async function writeEntries(value) {
  try {
    const cache = await caches.open(INDEX);
    await cache.put(keyFor("/__offline_index__"), new Response(JSON.stringify(value), { headers: { "Content-Type": "application/json" } }));
  } catch (error) {
    throw new Error("Could not save the offline library. Browser storage may be unavailable or full.", { cause: error });
  }
}
async function cleanAssets() {
  try {
    const saved = await entries();
    const keep = new Set(saved.flatMap(entry => entry.assets));
    const shellMeta = await (await caches.open(INDEX)).match(keyFor("/__offline_shell__"));
    if (shellMeta) (await shellMeta.json()).forEach(asset => keep.add(asset));
    const cache = await caches.open(ASSETS);
    const obsolete = (await cache.keys()).filter(request => !keep.has(new URL(request.url).pathname));
    await Promise.all(obsolete.map(request => cache.delete(request)));
  } catch (error) {
    throw new Error("Could not clean offline assets. Referenced resources are preserved when metadata is unreadable.", { cause: error });
  }
}
const referenceWhitespace = character => character === " " || character === "\n" || character === "\r" || character === "\t";
function referenceStart(text, index) {
  if (text.startsWith("src=", index)) return { start: index + 4, css: false };
  if (text.startsWith("href=", index)) return { start: index + 5, css: false };
  if (!text.startsWith("url(", index)) return null;
  let start = index + 4;
  while (referenceWhitespace(text.charAt(start))) start++;
  return { start, css: true };
}
function readReference(text, start, css) {
  const quote = text.charAt(start);
  if (quote === '"' || quote === "'") {
    const end = text.indexOf(quote, start + 1);
    return { end, value: text.slice(start + 1, end) };
  }
  if (!css) return null;
  const end = text.indexOf(")", start);
  return { end, value: text.slice(start, end).trim() };
}
/** Each scan advances beyond its delimiter, including malformed references. */
function scanResourceReferences(text, visit) {
  let cursor = 0;
  while (cursor < text.length) {
    const opening = referenceStart(text, cursor);
    if (!opening) { cursor++; continue; }
    const reference = readReference(text, opening.start, opening.css);
    if (!reference) { cursor++; continue; }
    if (reference.end < 0) return;
    visit(reference.value);
    cursor = reference.end + 1;
  }
}
function assetURLs(text, base) {
  const urls = new Set();
  // Parse references as text only; no DOM, rendering or execution of fetched HTML.
  scanResourceReferences(text, reference => {
    try {
      const url = new URL(decodeEntities(reference), base);
      if (url.origin !== self.location.origin || url.username || url.password || url.search || url.hash) return;
      urls.add(downloadURL(url.pathname, "asset").pathname);
    } catch {
      // Malformed or non-public resource references are intentionally ignored.
    }
    if (urls.size > 180) throw new Error("This lesson has too many assets to save offline.");
  });
  return [...urls];
}
// These delimiters are literal parser tokens, never interpolated markup or DOM sinks.
function lessonTitle(sourceText, fallback) {
  const start = sourceText.indexOf(/*safe*/ "<title>");
  if (start < 0) return fallback;
  const end = sourceText.indexOf(/*safe*/ "</title>", start + 7);
  return end < 0 ? fallback : decodeEntities(sourceText.slice(start + 7, Math.min(end, start + 507)));
}
function suppliedAssetPaths(values) {
  return values.flatMap(value => {
    try { return [downloadURL(value, "asset").pathname]; }
    catch { return []; } // Performance entries can contain unrelated, non-public resources.
  });
}
async function fetchAsset(path, budget) {
  const url = downloadURL(path, "asset");
  const response = await fetchPublic(url, { cache: "force-cache" });
  if (!response.ok || response.redirected) throw new Error("A lesson asset could not be downloaded. Try again online.");
  const buffer = await response.clone().arrayBuffer();
  budget.bytes += buffer.byteLength;
  if (buffer.byteLength > MAX_ASSET_BYTES || budget.bytes > MAX_DOWNLOAD_BYTES) throw new Error("This lesson exceeds the 25 MB offline download limit.");
  const dependencies = path.endsWith(".css") ? assetURLs(new TextDecoder().decode(buffer), url) : [];
  return { path, response, dependencies };
}
async function fetchAssets(paths, downloaded, budget) {
  const pending = [...new Set(paths)].filter(path => !downloaded.has(path));
  if (!pending.length) return;
  if (downloaded.size + pending.length > 180) throw new Error("This lesson has too many assets to save offline.");
  // Bounded batches keep network and memory pressure modest; CSS adds another batch.
  const batch = pending.slice(0, 8);
  const resources = await Promise.all(batch.map(path => fetchAsset(path, budget)));
  for (const resource of resources) downloaded.set(resource.path, resource.response);
  await fetchAssets([...pending.slice(8), ...resources.flatMap(resource => resource.dependencies)], downloaded, budget);
}
async function download(path, shell = false, suppliedAssets = []) {
  const url = downloadURL(path, shell ? "shell" : "lesson");
  let saved = await entries();
  if (!shell && !saved.some(entry => entry.path === path) && saved.length >= MAX_LESSONS) throw new Error("Your offline library is full (20 lessons). Remove a download first.");
  const response = await fetchPublic(url, { cache: "reload", headers: { Accept: "text/html" } });
  if (!response.ok || response.redirected || !response.headers.get("content-type")?.includes("text/html")) throw new Error("Could not download this lesson. Check your connection.");
  const buffer = await response.clone().arrayBuffer();
  if (buffer.byteLength > MAX_DOWNLOAD_BYTES) throw new Error("This lesson is too large to save offline.");
  const sourceText = new TextDecoder().decode(buffer);
  const pending = [...assetURLs(sourceText, url), ...suppliedAssetPaths(suppliedAssets)];
  const downloaded = new Map();
  await fetchAssets(pending, downloaded, { bytes: buffer.byteLength });
  const assetCache = await caches.open(ASSETS);
  const existing = await assetCache.keys();
  const existingPaths = new Set(existing.map(request => new URL(request.url).pathname));
  if (existingPaths.size + [...downloaded.keys()].filter(asset => !existingPaths.has(asset)).length > MAX_ASSETS) throw new Error("Offline asset storage is full. Remove older downloads first.");
  // Publish the document and index only after every resource has been fetched successfully.
  await Promise.all([...downloaded].map(([asset, content]) => assetCache.put(keyFor(asset), content)));
  await (await caches.open(DOCS)).put(keyFor(path), response);
  if (shell) {
    await (await caches.open(INDEX)).put(keyFor("/__offline_shell__"), new Response(JSON.stringify([...downloaded.keys()])));
  } else {
    const title = lessonTitle(sourceText, path);
    saved = saved.filter(entry => entry.path !== path);
    saved.push({ path, title, savedAt: Date.now(), assets: [...downloaded.keys()] });
    await writeEntries(saved);
  }
}
let queue = Promise.resolve();
self.addEventListener("install", event => {
  // A newer worker waits for old tabs to close; reading is never interrupted by a reload.
  event.waitUntil(download(SHELL, true).catch(error => { console.warn("Offline shell could not be downloaded.", error); }));
});
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()); });
function trustedMessageSource(source) {
  if (!source || typeof source.url !== "string") return false;
  try { return new URL(source.url).origin === self.location.origin; }
  catch { return false; }
}
self.addEventListener("message", event => {
  // A message port alone does not authorize cache reads, downloads or deletion.
  if (event.origin !== self.location.origin) return;
  if (!trustedMessageSource(event.source)) return;
  const reply = event.ports?.[0]; if (!reply) return;
  const data = event.data ?? {};
  const operation = async () => {
    try {
      let result;
      if (data.type === "LIST") result = await entries();
      else if (data.type === "DOWNLOAD") { await download(data.path, false, Array.isArray(data.assets) ? data.assets : []); result = true; }
      else if (data.type === "DELETE") { const saved = await entries(); if (!saved.some(entry => entry.path === data.path)) throw new Error("Download not found."); await writeEntries(saved.filter(entry => entry.path !== data.path)); await (await caches.open(DOCS)).delete(keyFor(data.path)); await cleanAssets(); result = true; }
      else throw new Error("Unknown offline operation.");
      reply.postMessage({ result });
    } catch (error) { reply.postMessage({ error: error.message || "Could not update offline downloads. Browser storage may be full." }); }
  };
  queue = queue.then(operation, operation); event.waitUntil(queue);
});
// Audited static HTML: no variables, user data or interpolation enter this response.
function unavailableLessonResponse() {
  return new Response(/*safe*/ '<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>Lesson unavailable offline</title><body><h1>This lesson has not been downloaded</h1><p>Connect to the internet to download it, or open a saved lesson.</p><a href="/offline">Offline library</a></body></html>', { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } });
}
function incomingPublicURL(request, kind) {
  try {
    const received = new URL(request.url);
    if (received.origin !== self.location.origin || received.search || received.hash) return null;
    return downloadURL(received.pathname, kind);
  } catch { return null; }
}
async function offlineDocument(pathname) {
  try { return await (await caches.open(DOCS)).match(keyFor(pathname)) || unavailableLessonResponse(); }
  catch (error) {
    console.warn("Offline document storage is unavailable.", error);
    return unavailableLessonResponse();
  }
}
async function navigate(request) {
  const url = incomingPublicURL(request, "shell");
  if (!url) return unavailableLessonResponse();
  try { return await fetchPublic(url, { headers: { Accept: "text/html" } }); }
  catch { return offlineDocument(url.pathname); }
}
async function staticResource(request) {
  const url = incomingPublicURL(request, "asset");
  if (!url) return Response.error();
  try {
    const saved = await (await caches.open(ASSETS)).match(keyFor(url.pathname));
    if (saved) return saved;
  } catch (error) { console.warn("Offline asset storage is unavailable.", error); }
  // Runtime fetches are never cached: only explicit lesson downloads and shell assets persist.
  try { return await fetchPublic(url); }
  catch { return Response.error(); }
}
self.addEventListener("fetch", event => {
  const request = event.request; const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || blocked(url.pathname) || url.search || request.headers.has("RSC")) return;
  if (request.mode === "navigate") {
    if (!lessonPath(url.pathname) && url.pathname !== SHELL) return;
    event.respondWith(navigate(request));
  } else if (assetPath(url.pathname)) event.respondWith(staticResource(request));
});
