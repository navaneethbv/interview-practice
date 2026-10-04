## Intuition

Maintain the best k values seen so far, with the largest retained value immediately accessible.
A new value can improve this selection only if it is smaller than that current largest member.
A max-heap provides exactly the replacement operation needed.

## Brute force

Sort the entire input and take its first k entries.
That costs O(n log n) time even when k is much smaller than n.
A bounded heap limits ordering work to the candidates that can remain in the answer.

## Approach

Return an empty list immediately when k is zero.
Until the heap reaches size k, insert each value.
Afterward compare new values with the heap maximum.
If a new value is smaller, replace that maximum; otherwise discard the new value.
After every input prefix, the heap contains its smallest k values, or all values if fewer than k have arrived.
Return the heap's retained values in any order.

## Walkthrough

Example 1 asks for four values from `[1, 3, 5, 7, 2, 4, 6, 8]`.
After the first four inputs, the retained values are 1, 3, 5, and 7.
Value 2 replaces 7, and value 4 replaces 5.
Values 6 and 8 cannot improve the retained set.
The answer contains 1, 2, 3, and 4; the reference's heap iteration order need not match the sorted illustrative output.

## Complexity

For n values and positive k, time is O(n log(k + 1)) and auxiliary heap space is O(k).
The returned result also holds k values.
For k equal to zero, the early return is constant time.

## Edge cases

Repeated values are separate selectable occurrences.
When k equals n, every value is retained.
A value equal to the heap maximum need not replace it.

## Common mistakes

A min-heap of original values exposes the wrong element for eviction.
Do not require sorted output when the contract accepts any ordering.

## Language notes

Python negates values to emulate a max-heap using `heapq`.
Java uses a reverse-order `PriorityQueue<Integer>` without changing the stored values.
