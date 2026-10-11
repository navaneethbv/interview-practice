# Print in Order

Three threads share one `Foo` instance.
One thread calls `first`, one calls `second` and one calls `third`, each passing a callback that prints its own word.
The threads may start in any order.
Make sure the callbacks run in the order first, second, third, so the output is always `firstsecondthird`.

The test input `order` lists which method each thread calls, in the order the threads are started: `[3, 1, 2]` starts the `third` thread first.

## Signatures

- Java: `void first(Runnable printFirst)`, `second(Runnable printSecond)`, `third(Runnable printThird)`
- C++: `void first(function<void()> printFirst)` and so on
- Go: `func NewFoo() *Foo` and methods `First(printFirst func())`, `Second`, `Third`

## How this is judged

Solve this in Java, C++ or Go; it needs real threads, which the browser's Python and JavaScript runtimes do not have.
Each test runs your class 20 times with the threads started in the given order and small random delays, so a race that only sometimes misorders the output is still caught.
If the threads have not finished after 3 seconds, the run stops with a deadlock error.

## Examples

### Example 1

```text
Input: order = [1, 2, 3]
Output: "firstsecondthird"
Explanation: The threads start in order.
```

### Example 2

```text
Input: order = [1, 3, 2]
Output: "firstsecondthird"
Explanation: The third thread starts before the second but must wait for it.
```

## Constraints

- `order` is a permutation of `[1, 2, 3]`.
