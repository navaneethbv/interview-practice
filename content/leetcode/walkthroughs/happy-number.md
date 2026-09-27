## Intuition

The next value depends only on the current decimal digits.
If a value repeats before reaching 1, every later value repeats in the same cycle, so the number is not happy.
A set of previously seen values detects that cycle directly.
The process cannot grow without bound because the digit-square sum is much smaller than the original large value.

## Brute force

A bounded simulation could run a fixed number of transformations and assume that reaching the bound means a cycle.
That relies on an unexplained constant and can stop too early for a different numeric range.
Tracking seen values gives a proof of termination when a repeated state appears.
Floyd's tortoise and hare could reduce memory, but the set is more readable here.

## Approach

1. While n is neither 1 nor previously seen, add it to seen.
2. Compute digit_square_sum by extracting or reading each decimal digit and adding its square.
3. Replace n with that sum.
4. The loop ends either at 1 or at a repeated value.
5. Return whether the terminating value is 1.

## Walkthrough

For Example 1, start with 7.
Its digit-square sum is 49, then 97, then 130, then 10, and finally 1.
The loop stops at 1 and returns true.
For Example 2, the sequence from 2 eventually reaches a value already in seen without reaching 1.
The loop then returns false.

## Complexity

For d decimal digits, one transformation costs O(d) time.
The set stores one state per transformation, so total space is O(r), where r is the number of states before termination.
For signed 32-bit input, the state quickly enters a small bounded range, so r is bounded by a small constant in practice.
The Python and Java references both use the same cycle-detection behavior.

## Edge cases

Input 1 is immediately happy.
Numbers containing zero digits simply add zero for those positions.
A repeated non-one state means the process is cyclic and unhappy.
The maximum signed 32-bit input is handled without multiplying the original value.

## Common mistakes

Do not return false merely because one intermediate value is not 1.
Do not forget to stop when a value repeats.
Do not square the whole number instead of each digit.
Do not use a cycle test that confuses reaching 1 with revisiting it.

## Language notes

Python reads the decimal representation and accumulates a named sum.
Java extracts digits with remainder and division in a helper method.
The Java helper keeps the public method simple and uses only the harness's existing collection imports.
