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
  const originalFetch = context.fetch as (input: string) => Promise<Response>;
  context.fetch = async (input: string) =>
    input.includes("image.webp")
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
