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
const blocked = pathname => /(?:^|\/)(?:api|auth|sync|login|logout|account|settings)(?:\/|$)/.test(pathname) || /(?:worker|runner|pyodide|monaco)/i.test(pathname);
const lessonPath = pathname => /^\/learn\/[a-zA-Z0-9_-]+$/.test(pathname) || /^\/system-design\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(pathname) || /^\/business-analyst\/(?:senior\/)?[a-zA-Z0-9_-]+$/.test(pathname) && !/\/(final|study-plan)$/.test(pathname);
const assetPath = pathname => !blocked(pathname) && (/^\/_next\/static\//.test(pathname) || /^\/(?:course-assets|system-design|icons|images)\/.+\.(?:png|jpe?g|webp|avif|gif|svg|woff2?|css|js)$/i.test(pathname) || pathname === "/favicon.ico" || pathname === "/manifest.webmanifest");
const keyFor = path => new Request(new URL(path, self.location.origin));
async function entries() {
  const cache = await caches.open(INDEX); const response = await cache.match(keyFor("/__offline_index__"));
  try { return response ? await response.json() : []; } catch { return []; }
}
async function writeEntries(value) { const cache = await caches.open(INDEX); await cache.put(keyFor("/__offline_index__"), new Response(JSON.stringify(value), { headers: { "Content-Type": "application/json" } })); }
async function cleanAssets() {
  const saved = await entries();
  const keep = new Set(saved.flatMap(entry => entry.assets));
  const shellMeta = await (await caches.open(INDEX)).match(keyFor("/__offline_shell__"));
  if (shellMeta) { try { (await shellMeta.json()).forEach(asset => keep.add(asset)); } catch {} }
  const cache = await caches.open(ASSETS);
  for (const request of await cache.keys()) if (!keep.has(new URL(request.url).pathname)) await cache.delete(request);
}
function assetURLs(text, base) {
  const urls = new Set();
  // HTML resources and CSS dependencies; never follow anchors, forms or arbitrary JSON.
  const patterns = [/(?:src|href)=["']([^"']+)["']/g, /url\(\s*["']?([^"')\s]+)["']?\s*\)/g];
  for (const pattern of patterns) for (const match of text.matchAll(pattern)) {
    try { const url = new URL(match[1].replace(/&amp;/g, "&"), base); if (url.origin === self.location.origin && !url.search && assetPath(url.pathname)) urls.add(url.pathname); } catch {}
  }
  return [...urls];
}
async function download(path, shell = false, suppliedAssets = []) {
  if (!(shell && path === SHELL) && !lessonPath(path)) throw new Error("Only public lesson pages can be downloaded.");
  let saved = await entries();
  if (!shell && !saved.some(entry => entry.path === path) && saved.length >= MAX_LESSONS) throw new Error("Your offline library is full (20 lessons). Remove a download first.");
  const response = await fetch(path, { credentials: "omit", cache: "reload", headers: { Accept: "text/html" } });
  if (!response.ok || response.redirected || !response.headers.get("content-type")?.includes("text/html")) throw new Error("Could not download this lesson. Check your connection.");
  const html = await response.clone().text();
  if (html.length > MAX_DOWNLOAD_BYTES) throw new Error("This lesson is too large to save offline.");
  const pending = [...new Set([...assetURLs(html, new URL(path, self.location.origin)), ...suppliedAssets.filter(p => typeof p === "string" && assetPath(p) && !p.includes("?"))])];
  const downloaded = new Map(); let bytes = html.length;
  while (pending.length) {
    const asset = pending.shift(); if (downloaded.has(asset)) continue;
    if (downloaded.size >= 180) throw new Error("This lesson has too many assets to save offline.");
    const assetResponse = await fetch(asset, { credentials: "omit", cache: "force-cache" });
    if (!assetResponse.ok || assetResponse.redirected) throw new Error("A lesson asset could not be downloaded. Try again online.");
    const buffer = await assetResponse.clone().arrayBuffer(); bytes += buffer.byteLength;
    if (buffer.byteLength > MAX_ASSET_BYTES || bytes > MAX_DOWNLOAD_BYTES) throw new Error("This lesson exceeds the 25 MB offline download limit.");
    downloaded.set(asset, assetResponse);
    if (/\.css$/.test(asset)) for (const dependency of assetURLs(await assetResponse.clone().text(), new URL(asset, self.location.origin))) if (!downloaded.has(dependency)) pending.push(dependency);
  }
  const assetCache = await caches.open(ASSETS);
  const existing = await assetCache.keys();
  const existingPaths = new Set(existing.map(request => new URL(request.url).pathname));
  if (existingPaths.size + [...downloaded.keys()].filter(path => !existingPaths.has(path)).length > MAX_ASSETS) throw new Error("Offline asset storage is full. Remove older downloads first.");
  // Publish the document and index only after every resource has been fetched successfully.
  for (const [asset, content] of downloaded) await assetCache.put(keyFor(asset), content);
  await (await caches.open(DOCS)).put(keyFor(path), response);
  if (shell) {
    await (await caches.open(INDEX)).put(keyFor("/__offline_shell__"), new Response(JSON.stringify([...downloaded.keys()])));
  } else {
    const title = (html.match(/<title>(.*?)<\/title>/s)?.[1] ?? path).replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
    saved = saved.filter(entry => entry.path !== path);
    saved.push({ path, title, savedAt: Date.now(), assets: [...downloaded.keys()] }); await writeEntries(saved);
  }
}
let queue = Promise.resolve();
self.addEventListener("install", event => {
  // A newer worker waits for old tabs to close; reading is never interrupted by a reload.
  event.waitUntil(download(SHELL, true).catch(() => {}));
});
self.addEventListener("activate", event => { event.waitUntil(self.clients.claim()); });
self.addEventListener("message", event => {
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
self.addEventListener("fetch", event => {
  const request = event.request; const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || blocked(url.pathname) || url.search || request.headers.has("RSC")) return;
  if (request.mode === "navigate") {
    if (!lessonPath(url.pathname) && url.pathname !== SHELL) return;
    event.respondWith(fetch(request).catch(async () => (await caches.open(DOCS)).match(keyFor(url.pathname)).then(response => response || new Response('<!doctype html><html lang="en"><meta name="viewport" content="width=device-width"><title>Lesson unavailable offline</title><body><h1>This lesson has not been downloaded</h1><p>Connect to the internet to download it, or open a saved lesson.</p><a href="/offline">Offline library</a></body></html>', { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }))));
  } else if (assetPath(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(ASSETS); const saved = await cache.match(keyFor(url.pathname));
      // Runtime fetches are never cached: only explicit lesson downloads and shell assets persist.
      return saved || fetch(request);
    })());
  }
});
