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
