import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_READER,
  isReaderPreferences,
  isReaderPositions,
  readerSentences,
} from "./reader-data";
import { readFileSync } from "node:fs";
import vm from "node:vm";

test("reader backup validators enforce finite bounds and lesson identities", () => {
  assert.equal(isReaderPreferences(DEFAULT_READER), true);
  for (const patch of [
    { speed: NaN },
    { width: 1000 },
    { fontSize: 0 },
    { voice: "x".repeat(301) },
    { lineSpacing: Infinity },
  ])
    assert.equal(isReaderPreferences({ ...DEFAULT_READER, ...patch }), false);
  const position = { paragraph: 4, sentence: 2, at: 1000 };
  assert.equal(
    isReaderPositions({
      "/learn/arrays#reader-content": position,
      "/business-analyst/senior/chapter-1#ba-reader-1-2": position,
    }),
    true,
  );
  assert.equal(isReaderPositions({ "/api/private": position }), false);
  assert.equal(
    isReaderPositions({ "/learn/arrays": { ...position, paragraph: -1 } }),
    false,
  );
  assert.equal(
    isReaderPositions({ "/learn/arrays": { ...position, sentence: 1.1 } }),
    false,
  );
  assert.equal(isReaderPositions(Array(3)), false);
});

test("speech segmentation retains full text, order and bounded utterances", () => {
  const input =
    "First sentence. Second question? " + "word ".repeat(180) + "Done!";
  const parts = readerSentences(input);
  assert.ok(parts.length > 3);
  assert.ok(parts.every((part) => part.length <= 220 && part.trim()));
  assert.equal(
    parts.join(" ").replace(/\s+/g, " "),
    input.replace(/\s+/g, " "),
  );
});

test("speech scanner handles pathological punctuation and unbroken long text", () => {
  for (const input of [
    "!".repeat(200000),
    "x".repeat(200000),
    "word ".repeat(40000),
  ]) {
    const started = performance.now();
    const parts = readerSentences(input);
    assert.ok(performance.now() - started < 2000);
    assert.ok(parts.every((part) => part.length <= 220));
    assert.equal(parts.join("").replaceAll(" ", ""), input.replaceAll(" ", ""));
  }
});

function workerHarness() {
  const events: Record<string, (event: Record<string, unknown>) => void> = {};
  const cacheStore = new Map<string, Map<string, Response>>();
  const cacheKey = (value: Request | string) =>
    typeof value === "string" ? value : value.url;
  const caches = {
    open: async (name: string) => {
      if (!cacheStore.has(name)) cacheStore.set(name, new Map());
      const cache = cacheStore.get(name)!;
      return {
        match: async (key: Request | string) =>
          cache.get(cacheKey(key))?.clone(),
        put: async (key: Request | string, value: Response) => {
          cache.set(cacheKey(key), value.clone());
        },
        keys: async () => [...cache.keys()].map((url) => new Request(url)),
        delete: async (key: Request | string) => cache.delete(cacheKey(key)),
      };
    },
  };
  const origin = "https://example.test";
  const context = vm.createContext({
    URL,
    Request,
    Response,
    Headers,
    TextDecoder,
    console,
    Map,
    Set,
    Promise,
    caches,
    self: {
      location: { origin },
      clients: { claim: async () => {} },
      addEventListener: (type: string, fn: (typeof events)[string]) => {
        events[type] = fn;
      },
    },
    fetch: async (input: string | Request) => {
      const url = new URL(
        typeof input === "string" ? input : input.url,
        origin,
      );
      if (url.pathname === "/_next/static/lesson.css")
        return new Response(
          "body{background:url('/course-assets/image.webp')}",
          { headers: { "Content-Type": "text/css" } },
        );
      if (url.pathname === "/course-assets/image.webp")
        return new Response("image");
      return new Response(
        '<html><title>Lesson</title><link href="/_next/static/lesson.css"><script src="/api/private"></script><a href="/learn/other">Other</a></html>',
        { headers: { "Content-Type": "text/html" } },
      );
    },
  });
  vm.runInContext(readFileSync("public/sw.js", "utf8"), context);
  const message = (data: Record<string, unknown>) =>
    new Promise<{ result?: unknown; error?: string }>((resolve) =>
      events.message({
        data,
        origin,
        source: { url: `${origin}/learn/arrays` },
        ports: [{ postMessage: resolve }],
        waitUntil: () => {},
      }),
    );
  return { events, cacheStore, message, context };
}

test("offline worker downloads explicit public lessons with CSS dependencies, then deletes unshared assets", async () => {
  const { message, cacheStore } = workerHarness();
  assert.equal(
    (await message({ type: "DOWNLOAD", path: "/learn/arrays" })).result,
    true,
  );
  const list = (await message({ type: "LIST" })).result as {
    path: string;
    assets: string[];
  }[];
  assert.equal(list.length, 1);
  assert.equal(list[0].path, "/learn/arrays");
  assert.deepEqual(
    [...list[0].assets].sort(),
    ["/_next/static/lesson.css", "/course-assets/image.webp"].sort(),
  );
  assert.equal(cacheStore.get("ip-offline-documents-v1")?.size, 1);
  await message({ type: "DELETE", path: "/learn/arrays" });
  assert.equal(cacheStore.get("ip-offline-documents-v1")?.size, 0);
  assert.equal(cacheStore.get("ip-offline-assets-v1")?.size, 0);
});

test("offline worker rejects nonlesson downloads and does not intercept private or runner requests", async () => {
  const { message, events } = workerHarness();
  for (const path of [
    "/api/run/java",
    "/auth/login",
    "/practice",
    "/business-analyst/final",
    "https://other.test/learn/arrays",
  ])
    assert.match(
      (await message({ type: "DOWNLOAD", path })).error!,
      /Only public lesson/,
    );
  for (const [path, method, headers] of [
    ["/learn/arrays", "POST", {}],
    ["/api/run/java", "GET", {}],
    ["/auth/login", "GET", {}],
    ["/_next/static/runner.js", "GET", {}],
    ["/learn/arrays?_rsc=secret", "GET", {}],
    ["/learn/arrays", "GET", { RSC: "1" }],
  ] as const) {
    let intercepted = false;
    events.fetch({
      request: new Request(`https://example.test${path}`, { method, headers }),
      respondWith: () => {
        intercepted = true;
      },
    });
    assert.equal(intercepted, false, `${method} ${path}`);
  }
});

test("offline worker serves saved documents without caching unsaved navigation or runtime resources", async () => {
  const { message, events, context, cacheStore } = workerHarness();
  await message({ type: "DOWNLOAD", path: "/learn/arrays" });
  context.fetch = async () => {
    throw new Error("offline");
  };
  const responseFor = async (path: string) => {
    let response: Promise<Response> | undefined;
    events.fetch({
      request: {
        url: `https://example.test${path}`,
        method: "GET",
        mode: "navigate",
        headers: new Headers(),
      },
      respondWith: (value: Promise<Response>) => {
        response = value;
      },
    });
    return response!;
  };
  assert.equal((await responseFor("/learn/arrays")).status, 200);
  assert.equal((await responseFor("/learn/unsaved")).status, 503);
  assert.equal(cacheStore.get("ip-offline-documents-v1")?.size, 1);
});

test("offline removal preserves shared dependencies and the library has an explicit cap", async () => {
  const { message, cacheStore } = workerHarness();
  for (let index = 0; index < 20; index++)
    assert.equal(
      (await message({ type: "DOWNLOAD", path: `/learn/lesson-${index}` }))
        .result,
      true,
    );
  assert.match(
    (await message({ type: "DOWNLOAD", path: "/learn/overflow" })).error!,
    /20 lessons/,
  );
  await message({ type: "DELETE", path: "/learn/lesson-0" });
  assert.equal(cacheStore.get("ip-offline-assets-v1")?.size, 2);
  assert.equal(
    (await message({ type: "LIST" })).result &&
      ((await message({ type: "LIST" })).result as unknown[]).length,
    19,
  );
});

test("incomplete downloads are never published as saved lessons", async () => {
  const { message, context, cacheStore } = workerHarness();
  const originalFetch = context.fetch as (input: string | Request) => Promise<Response>;
  context.fetch = async (input: string | Request) =>
    (typeof input === "string" ? input : input.url).includes("image.webp")
      ? new Response("failure", { status: 503 })
      : originalFetch(input);
  assert.match(
    (await message({ type: "DOWNLOAD", path: "/learn/arrays" })).error!,
    /asset could not/,
  );
  assert.equal(
    ((await message({ type: "LIST" })).result as unknown[]).length,
    0,
  );
  assert.equal(cacheStore.get("ip-offline-documents-v1")?.size ?? 0, 0);
});


test("offline titles decode original entities once without double-unescaping nested entities", async () => {
  const { message, context } = workerHarness();
  context.fetch = async () => new Response('<html><title>&amp;quot; &amp;#x27; &quot; &#x27; &amp;</title></html>', { headers: { "Content-Type": "text/html" } });
  assert.equal((await message({ type: "DOWNLOAD", path: "/learn/entities" })).result, true);
  const list = (await message({ type: "LIST" })).result as { title: string }[];
  assert.equal(list[0].title, `&quot; &#x27; " ' &`);
});

test("offline downloads reject noncanonical paths and never fetch unsafe supplied resources", async () => {
  const { message, context } = workerHarness();
  const originalFetch = context.fetch as (input: string | Request) => Promise<Response>;
  const fetched: string[] = [];
  context.fetch = async (input: string | Request) => {
    const url = typeof input === "string" ? new URL(input, "https://example.test").href : input.url;
    fetched.push(url);
    return originalFetch(input);
  };
  for (const path of ["//other.test/learn/arrays", "/learn/../api/private", "/learn/%61rrays", "/learn/arrays?x=1", "/learn/arrays#fragment", "/learn/arrays\\private", 123, null]) {
    assert.match((await message({ type: "DOWNLOAD", path })).error!, /Only public lesson/);
  }
  assert.equal(fetched.length, 0);
  assert.equal((await message({ type: "DOWNLOAD", path: "/learn/arrays", assets: [
    "https://other.test/_next/static/secret.js", "//other.test/_next/static/secret.js",
    "/_next/static/../../../api/private.js", "/_next/static/%2e%2e/secret.js",
    "/_next/static/file.js?private=1", "/_next/static/file.js#fragment",
    "/_next/static/\\other.test/private.js", "/api/private.js", "/_next/static/safe.js",
  ] })).result, true);
  assert.ok(fetched.includes("https://example.test/_next/static/safe.js"));
  assert.ok(fetched.every(url => url.startsWith("https://example.test/")));
  assert.ok(fetched.every(url => !url.includes("private") && !url.includes("secret") && !url.includes("%") && !url.includes("?") && !url.includes("#")));
});

test("offline HTML limit counts encoded bytes rather than JavaScript character length", async () => {
  const { message, context, cacheStore } = workerHarness();
  const html = "é".repeat(13 * 1024 * 1024);
  assert.ok(html.length < 25 * 1024 * 1024);
  context.fetch = async () => new Response(html, { headers: { "Content-Type": "text/html" } });
  assert.match((await message({ type: "DOWNLOAD", path: "/learn/large" })).error!, /too large/);
  assert.equal(cacheStore.get("ip-offline-documents-v1")?.size ?? 0, 0);
});


test("offline resource and title scanners handle long malformed markup in linear time", () => {
  const { context } = workerHarness();
  for (const text of ["src=\"" + "src=href=url(".repeat(100000), "url(".repeat(200000), "<title>".repeat(100000)]) {
    context.longMarkup = text;
    const started = performance.now();
    const resources = vm.runInContext('assetURLs(longMarkup, new URL("https://example.test/learn/arrays"))', context);
    assert.equal(resources.length, 0);
    assert.equal(vm.runInContext('lessonTitle(longMarkup, "fallback")', context), "fallback");
    assert.ok(performance.now() - started < 2000);
  }
});


test("offline index read failures preserve existing downloads instead of overwriting the library", async () => {
  for (const failure of ["open", "match", "json"]) {
    const { message, context, cacheStore } = workerHarness();
    await message({ type: "DOWNLOAD", path: "/learn/existing" });
    const index = cacheStore.get("ip-offline-index-v1")!;
    const key = "https://example.test/__offline_index__";
    if (failure === "json") index.set(key, new Response("{corrupted-json"));
    const original = await index.get(key)!.clone().text();
    const originalCaches = context.caches as { open(name: string): Promise<Record<string, unknown>> };
    context.caches = { open: async (name: string) => {
      if (failure === "open") throw new Error("disk unavailable");
      const cache = await originalCaches.open(name);
      if (failure === "match") return { ...cache, match: async () => { throw new Error("read unavailable"); } };
      return cache;
    } };
    const result = await message({ type: "DOWNLOAD", path: "/learn/new" });
    assert.match(result.error!, /Could not read the offline library/);
    assert.equal(await index.get(key)!.clone().text(), original);
    assert.equal(cacheStore.get("ip-offline-documents-v1")!.size, 1);
  }
});

test("offline cleanup retains resources when shell metadata cannot be read", async () => {
  const { message, context, cacheStore } = workerHarness();
  await message({ type: "DOWNLOAD", path: "/learn/existing" });
  const index = cacheStore.get("ip-offline-index-v1")!;
  index.set("https://example.test/__offline_shell__", new Response("{invalid-json"));
  const before = cacheStore.get("ip-offline-assets-v1")!.size;
  await assert.rejects(vm.runInContext("cleanAssets()", context), /Could not clean offline assets/);
  assert.equal(cacheStore.get("ip-offline-assets-v1")!.size, before);
});


test("offline messages reject foreign, missing and mismatched sender origins before accessing caches", async () => {
  const { events, context } = workerHarness();
  let accessed = false;
  context.caches = { open: async () => { accessed = true; throw new Error("must not access storage"); } };
  for (const [origin, source] of [
    ["https://other.test", { url: "https://other.test/learn/arrays" }],
    ["", { url: "https://example.test/learn/arrays" }],
    ["https://example.test", { url: "https://other.test/learn/arrays" }],
    ["https://example.test", null],
    ["https://example.test", { url: "invalid URL" }],
  ]) {
    let replied = false;
    let queued = false;
    events.message({ origin, source, data: { type: "DELETE", path: "/learn/arrays" }, ports: [{ postMessage: () => { replied = true; } }], waitUntil: () => { queued = true; } });
    await Promise.resolve();
    assert.equal(replied, false);
    assert.equal(queued, false);
    assert.equal(accessed, false);
  }
});

test("offline requests fix their authority independently of validated path assignment", () => {
  const { context } = workerHarness();
  const url = vm.runInContext('downloadURL("/learn/arrays", "lesson")', context) as URL;
  assert.equal(url.origin, "https://example.test");
  assert.equal(url.pathname, "/learn/arrays");
  for (const path of ["//other.test/learn/arrays", "https://other.test/learn/arrays", "/learn/../api/private", "/learn/arrays?next=https://other.test"]) {
    context.untrustedPath = path;
    assert.throws(() => vm.runInContext('downloadURL(untrustedPath, "lesson")', context), /Only public lesson/);
  }
});

test("navigation rebuilds public requests without forwarding caller credentials or headers", async () => {
  const { context } = workerHarness();
  const fetched: Request[] = [];
  context.fetch = async (request: Request) => { fetched.push(request); return new Response("public lesson"); };
  context.receivedRequest = new Request("https://example.test/learn/arrays", { headers: { Authorization: "Bearer private", Cookie: "session=private" }, credentials: "include" });
  assert.equal((await vm.runInContext("navigate(receivedRequest)", context) as Response).status, 200);
  assert.equal(fetched.length, 1);
  assert.equal(fetched[0].url, "https://example.test/learn/arrays");
  assert.equal(fetched[0].credentials, "omit");
  assert.equal(fetched[0].redirect, "error");
  assert.equal(fetched[0].headers.get("Authorization"), null);
  assert.equal(fetched[0].headers.get("Cookie"), null);
  context.receivedRequest = new Request("https://other.test/learn/arrays");
  assert.equal((await vm.runInContext("navigate(receivedRequest)", context) as Response).status, 503);
  assert.equal(fetched.length, 1);
});
