# JavaScript language fundamentals

Frontend loops usually combine a JavaScript fundamentals screen, a UI coding round, a frontend system design round and behavioral interviews.
This guide covers the frontend-specific parts; the JavaScript and TypeScript options in the problem workspace cover algorithm rounds.
Reviewed October 11, 2026.

## Scope and closures

`let` and `const` are block scoped; `var` is function scoped and hoisted.
A closure is a function together with the variables it captured from its defining scope.

```js
function counter() {
  let count = 0;
  return { increment: () => ++count, value: () => count };
}
const c = counter();
c.increment(); c.increment();
c.value(); // 2
```

The classic loop bug: with `var`, every callback shares one `i`; with `let`, each iteration gets its own binding.

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j)); // 0 1 2
```

## `this`

`this` is decided by how a function is called: as a method (`obj.f()`), plainly (`undefined` in strict mode), with `new`, or explicitly with `call`, `apply` or `bind`.
Arrow functions do not have their own `this`; they use the enclosing one, which is why they are convenient for callbacks inside methods.

## Prototypes and classes

Objects delegate property lookups along their prototype chain.
`class` syntax is a clearer way to set up the same prototype relationships.

## Equality and types

Use `===`; `==` applies coercion rules that surprise people (`0 == ""` is true).
`typeof null` is `"object"`, `NaN !== NaN`, and `Object.is` distinguishes `+0` and `-0`.

## Common implementation questions

Implement `debounce`, `throttle`, `Promise.all`, a deep clone, `Function.prototype.bind`, an event emitter, and `curry`.
Each tests closures and careful handling of `this` and arguments.

```js
function debounce(fn, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}
```

# The event loop and asynchronous code

## How the loop runs

JavaScript runs one task at a time on a single thread.
After each task, the runtime drains the **microtask** queue (promise callbacks, `queueMicrotask`) before taking the next **task** (timers, I/O, user events), and the browser may render between tasks.

```js
console.log("A");
setTimeout(() => console.log("B"));
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A D C B
```

A long synchronous task blocks input handling and rendering, which is why heavy work belongs in a Web Worker or should be split into chunks.

## Promises and async/await

`async` functions return promises; `await` pauses the function without blocking the thread.
Run independent operations concurrently with `Promise.all` instead of awaiting them one by one.
Know how `Promise.all`, `allSettled`, `race` and `any` differ in rejection behavior.

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let remaining = promises.length;
    if (remaining === 0) resolve(results);
    promises.forEach((p, i) =>
      Promise.resolve(p).then((value) => {
        results[i] = value;
        if (--remaining === 0) resolve(results);
      }, reject),
    );
  });
}
```

## Cancellation

Use `AbortController` to cancel fetches when a component unmounts or a newer request supersedes an older one; otherwise a slow old response can overwrite a newer result.

# The browser rendering pipeline and performance

## From HTML to pixels

1. Parse HTML into the DOM and CSS into the CSSOM.
2. Combine them into a render tree of visible elements.
3. **Layout** computes sizes and positions.
4. **Paint** fills pixels into layers.
5. **Composite** assembles layers on the GPU.

Changing geometry (width, top) triggers layout; changing color triggers paint; changing `transform` or `opacity` can often be composited alone, which is why animations prefer them.
Reading a layout property such as `offsetHeight` right after writing styles forces a synchronous layout; batch reads before writes.

## Core Web Vitals

- **LCP (Largest Contentful Paint):** loading speed of the main content; target under 2.5 seconds.
- **INP (Interaction to Next Paint):** responsiveness to input; target under 200 milliseconds.
- **CLS (Cumulative Layout Shift):** visual stability; target under 0.1.

## Practical optimizations

- Ship less JavaScript: code splitting, tree shaking, and lazy loading routes and heavy components.
- Serve responsive, modern image formats with explicit dimensions to avoid layout shift.
- Cache static assets with long-lived hashed filenames and use a CDN.
- Virtualize long lists so only visible rows exist in the DOM.
- Render on the server or at build time for content pages to improve first paint.

# Building UI components

UI coding rounds ask you to build a component in about 45 minutes, in plain JavaScript or a framework.
Interviewers look at correctness, state design, accessibility and edge cases more than at styling.

## A repeatable approach

1. Clarify the behavior, inputs and edge cases.
2. Define the state and what derives from it.
3. Build the static markup with semantic HTML.
4. Add interaction and keyboard support.
5. Handle loading, empty and error states.

## Example: an autocomplete

State: the input text, the suggestion list, the highlighted index, loading and error flags, and whether the list is open.

- Debounce input before requesting suggestions.
- Ignore stale responses, using a request counter or `AbortController`.
- Keyboard: Up and Down move the highlight, Enter selects, Escape closes.
- Accessibility: `role="combobox"` on the input with `aria-expanded` and `aria-controls`, `role="listbox"` and `role="option"` on the list, and `aria-activedescendant` for the highlighted option.
- Cache results per query to avoid repeated requests.

## Other common components

Modal dialog (focus trap, Escape to close, return focus on close), tabs (arrow-key navigation), infinite scroll (an `IntersectionObserver` sentinel), star rating, file upload with progress, a data table with sorting and pagination, and nested comments.

## Accessibility checklist

Use native elements first (`button`, `a`, `input`).
Everything must be reachable and operable by keyboard with a visible focus indicator.
Label every control, announce dynamic updates with live regions where needed, and check color contrast.

# Frontend system design

Frontend system design asks you to design a client application, for example a news feed, a chat app, a photo editor or an e-commerce checkout.

## Framework for the round

1. **Requirements:** features, devices, offline needs, performance targets.
2. **Architecture:** rendering strategy (client, server, static, streaming), routing, and component boundaries.
3. **Data model and state:** what lives on the server, in a client cache, in component state, and in the URL.
4. **API design:** endpoints or GraphQL queries, pagination, and real-time updates.
5. **Performance:** bundle size, caching, list virtualization, image strategy.
6. **Accessibility and internationalization.**
7. **Reliability and observability:** error boundaries, retries, client-side logging and performance monitoring.

## Worked sketch: a news feed

- Server render the first page for fast LCP, then hydrate.
- Cursor-based pagination with an `IntersectionObserver` to load more.
- A normalized client cache keyed by post id, so a like on one view updates every view of the post.
- Optimistic updates for likes with rollback on failure.
- New posts arrive over server-sent events; show "N new posts" instead of shifting content under the reader.
- Virtualize the list when it grows long; keep scroll position when navigating back.

## Follow-up questions

- How do you keep the app usable offline? (A service worker caching the shell and recent data, with queued writes.)
- How do you ship safely? (Feature flags, gradual rollout, and monitoring of real-user metrics.)
