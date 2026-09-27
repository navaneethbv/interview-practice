# Peeking Iterator

Wrap an integer iterator with a `peek()` method that reads its next value without advancing.
`next()` returns that same value and advances, while `hasNext()` reports whether another value exists.
The provided iterator offers only `next()` and `hasNext()`; do not inspect its backing collection.
Use constant additional space.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [[1, 2, 3]], ops = ["peek", "peek", "next", "next", "hasNext", "next", "hasNext"], args = [[], [], [], [], [], [], []]
Output: [1, 1, 1, 2, true, 3, false]
Explanation: Repeated peeks return 1 without consuming it; after three next calls the iterator is exhausted.
```

### Example 2

```text
Input: ctor = [[7]], ops = ["hasNext", "peek", "hasNext", "next", "hasNext"], args = [[], [], [], [], []]
Output: [true, 7, true, 7, false]
Explanation: Peeking leaves the sole value available until next consumes it.
```

## Constraints

- The initial iterator contains 1 to 1000 integers between 1 and 1000.
- peek and next are called only when a value exists.
- At most 1000 operations occur per test.
