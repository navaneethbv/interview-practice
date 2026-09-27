## Intuition

The answer is the first position whose value is not less than target.
That position is also the insertion point that keeps a sorted array ordered.
Binary search narrows an exclusive interval until its left endpoint is the answer.

## Brute force

A linear scan could stop at the first value at least target.
It takes O(n) time in the worst case and still needs a special return when every value is smaller.
The binary search preserves the same boundary definition with logarithmic time.

## Approach

1. Set left to zero and right to the array length, treating right as exclusive.
2. Inspect the middle position.
3. If its value is less than target, discard the left half through middle.
4. Otherwise keep middle as a possible insertion point by moving right to middle.
5. Return left when the interval becomes empty.

## Walkthrough

Example 1 searches [1, 4, 7] for 5.
The first middle is index 1 with value 4, which is too small, so left becomes 2.
The remaining interval contains index 2 with value 7, which is large enough, so right becomes 2.
The empty interval ends at index 2, where 5 belongs.

## Complexity

For n values, the binary search takes O(log n) time.
It uses O(1) auxiliary space and returns one integer.
An empty input returns zero because the initial interval is empty.
The result is a position, so no output collection is allocated.

## Edge cases

A target smaller than the first value returns zero.
A target larger than the last value returns n.
An equal value returns its first possible insertion position.
The statement's sorted order is the property that makes the boundary search valid.

## Common mistakes

- Using right as an inclusive index while initializing it to n accesses outside the array.
- Moving left past middle when the value is equal skips a valid insertion position.
- Returning middle after the loop ignores later narrowing decisions.
- Sorting the input again adds work and can alter caller-owned data.

## Language notes

Python and Java use the same half-open interval invariant.
Python performs integer division with two slash characters, while Java uses an overflow-safe midpoint expression.
Both methods return the lower-bound position.
