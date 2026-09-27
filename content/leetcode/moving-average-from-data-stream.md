# Moving Average from Data Stream

Maintain the average of the most recent size values in a stream.
`next(val)` inserts one value and returns the current average.
Before size values have arrived, average all values seen so far.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [3], ops = ["next", "next", "next", "next"], args = [[1], [10], [3], [5]]
Output: [1.0, 5.5, 4.666666666666667, 6.0]
Explanation: After the fourth insertion, the window contains 10, 3, and 5, averaging 6.
```

### Example 2

```text
Input: ctor = [1], ops = ["next", "next"], args = [[2], [8]]
Output: [2.0, 8.0]
Explanation: A size-1 window always averages just its latest value.
```

## Constraints

- 1 <= size <= 1000.
- -100000 <= val <= 100000.
- At most 10000 calls occur per test.
