# Print Zero Even Odd

A `ZeroEvenOdd` object is created with `n` and shared by three threads.
One calls `zero`, which may only print 0; one calls `even`, which prints even numbers; and one calls `odd`, which prints odd numbers.
Each method receives a `printNumber` callback.
Together they must print the sequence `0 1 0 2 0 3 ... 0 n`, with no separators, so for `n = 5` the output is `0102030405`.

## Signatures

- Java: `ZeroEvenOdd(int n)`, `void zero(IntConsumer printNumber)`, `even`, `odd`
- C++: `ZeroEvenOdd(int n)`, `void zero(function<void(int)> printNumber)`, `even`, `odd`
- Go: `func NewZeroEvenOdd(n int) *ZeroEvenOdd`, `Zero(printNumber func(int))`, `Even`, `Odd`

## How this is judged

Solve this in Java, C++ or Go; it needs real threads, which the browser's Python and JavaScript runtimes do not have.
Each test runs your class 20 times with the threads started in the given order and small random delays, so a race that only sometimes misorders the output is still caught.
If the threads have not finished after 3 seconds, the run stops with a deadlock error.

## Examples

### Example 1

```text
Input: n = 2
Output: "0102"
Explanation: Zero alternates with 1 and 2.
```

### Example 2

```text
Input: n = 5
Output: "0102030405"
Explanation: Odd and even numbers take turns after each zero.
```

## Constraints

- 1 <= n <= 1000
