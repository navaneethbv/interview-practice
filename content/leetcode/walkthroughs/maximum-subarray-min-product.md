## Intuition
For each element treated as the minimum, find the widest subarray where no smaller value blocks it.
A monotonic increasing stack finds those boundaries, while prefix sums provide each subarray sum in constant time.

## Brute force
Enumerating every subarray and finding its minimum costs O(n^2) or worse.
The stack processes each index once.

## Approach
1. Build prefix sums so any interval sum is a difference of two prefixes.
2. Scan indices with an increasing stack of possible minima.
3. When the current value is smaller or equal, pop the previous minimum.
4. Use the new stack boundary and current index as that minimum's maximal interval.
5. Evaluate its min-product and flush the stack with a sentinel at the end.

## Walkthrough
For Example 1, `[1,2,3,2]` gives prefix sums `[0,1,3,6,8]`.
The minimum 2 at the final position spans `[2,3,2]`, whose sum is 7 and product is 14.
The stack evaluates other candidate minima, but none exceeds 14.

## Complexity
Each index is pushed and popped once, so time is O(n).
The prefix array and stack use O(n) space.
The maximum is compared before applying the final modulus.

## Edge cases
All values are positive under the contract, so every candidate interval has a positive sum.
Equal values are popped consistently by the chosen monotonic condition.

## Common mistakes
Use the stack boundary to exclude a smaller value.
Use long arithmetic in Java for sums and products.
Apply modulo only after finding the maximum product.

## Language notes
Python uses arbitrary-precision integers.
Java stores prefix sums and products as `long`.
