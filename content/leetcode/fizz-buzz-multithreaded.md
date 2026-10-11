# Fizz Buzz Multithreaded

A `FizzBuzz` object is created with `n` and shared by four threads.
For every number from 1 to `n` exactly one thread prints:
`fizzbuzz` calls `printFizzBuzz` for multiples of 15, `fizz` calls `printFizz` for other multiples of 3,
`buzz` calls `printBuzz` for other multiples of 5, and `number` calls `printNumber(i)` for everything else.
The combined output must follow the numbers in order.
The judge returns what was printed as a list.

## Signatures

- Java: `FizzBuzz(int n)`, `void fizz(Runnable printFizz)`, `buzz`, `fizzbuzz`, `void number(IntConsumer printNumber)`
- C++: `FizzBuzz(int n)`, `void fizz(function<void()> printFizz)`, `buzz`, `fizzbuzz`, `void number(function<void(int)> printNumber)`
- Go: `func NewFizzBuzz(n int) *FizzBuzz`, `Fizz(printFizz func())`, `Buzz`, `Fizzbuzz`, `Number(printNumber func(int))`

## How this is judged

Solve this in Java, C++ or Go; it needs real threads, which the browser's Python and JavaScript runtimes do not have.
Each test runs your class 20 times with the threads started in the given order and small random delays, so a race that only sometimes misorders the output is still caught.
If the threads have not finished after 3 seconds, the run stops with a deadlock error.

## Examples

### Example 1

```text
Input: n = 15
Output: ["1", "2", "fizz", "4", "buzz", "fizz", "7", "8", "fizz", "buzz", "11", "fizz", "13", "14", "fizzbuzz"]
Explanation: Every thread must stop once all 15 numbers are printed.
```

### Example 2

```text
Input: n = 5
Output: ["1", "2", "fizz", "4", "buzz"]
Explanation: The fizzbuzz thread never prints but must still finish.
```

## Constraints

- 1 <= n <= 100
