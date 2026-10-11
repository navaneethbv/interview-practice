# Print FooBar Alternately

A `FooBar` object is created with `n`.
One thread calls `foo`, which must print `foo` `n` times, and another calls `bar`, which must print `bar` `n` times.
Coordinate them so the output is `foobar` repeated `n` times, whichever thread starts first.

## Signatures

- Java: `FooBar(int n)`, `void foo(Runnable printFoo)`, `void bar(Runnable printBar)`
- C++: `FooBar(int n)`, `void foo(function<void()> printFoo)`, `void bar(function<void()> printBar)`
- Go: `func NewFooBar(n int) *FooBar`, `Foo(printFoo func())`, `Bar(printBar func())`

## How this is judged

Solve this in Java, C++ or Go; it needs real threads, which the browser's Python and JavaScript runtimes do not have.
Each test runs your class 20 times with the threads started in the given order and small random delays, so a race that only sometimes misorders the output is still caught.
If the threads have not finished after 3 seconds, the run stops with a deadlock error.

## Examples

### Example 1

```text
Input: n = 1
Output: "foobar"
Explanation: One round.
```

### Example 2

```text
Input: n = 2
Output: "foobarfoobar"
Explanation: The bar thread is started first, but foo must still print first.
```

## Constraints

- 1 <= n <= 100
