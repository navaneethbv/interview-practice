## Intuition

Each value is the minimum for a set of subarrays.
A monotonic stack finds how far that value extends to the left and right before a smaller or equal value stops it.

## Brute force

Enumerating every subarray and updating its minimum takes O(n squared) time.
Summing those minima directly becomes too slow for the largest arrays.

## Approach

1. Keep indices with increasing values on a stack.
2. When a value is no longer increasing, pop the middle index.
3. Use the previous stack index and current index as its left and right boundaries.
4. Add value times left choices times right choices modulo 1,000,000,007.

## Walkthrough

Example 1:

For [3,1,2,4], the value 3 is popped when 1 arrives and contributes 3.
At the end, 4 contributes 4, 2 contributes 4, and 1 contributes 6 across all ranges where it is the minimum.
The total is 17.

## Complexity

Every index is pushed and popped once, giving O(n) time and O(n) stack space.
The Python total uses arbitrary-precision integers before the final modulus.
Java reduces each contribution modulo the constant and uses long for multiplication.

## Edge cases

Equal values are popped on the later equal value to assign each subarray once.
A one-element array contributes that element.
The sentinel pass at the end flushes all remaining indices.

## Common mistakes

Do not use the nearest smaller boundary on both sides without handling equal values consistently.
Do not push the sentinel index into the array access path.
Apply the modulus after products that may exceed a 32-bit integer.

## Language notes

Python guards the sentinel before indexing arr.
Java uses the same guard and an ArrayDeque of indices.
