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
