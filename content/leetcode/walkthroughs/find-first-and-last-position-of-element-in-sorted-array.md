## Intuition

The first and last positions are boundary searches in a sorted array.
A lower bound finds the first value greater than or equal to target.
An upper bound finds the first value strictly greater than target, so subtracting one gives the last target position.

## Brute force

A linear scan could record the first matching index and keep updating the last matching index.
That takes O(n) time even when the target is absent or appears in a short run.
Two binary searches use sorted order to guarantee O(log n) time.

## Approach

1. Run a lower-bound search that moves left on values at least target.
2. If that index is outside the array or holds another value, return [-1, -1].
3. Run an upper-bound search that moves past values equal to target.
4. Return the first index and one less than the upper bound.
5. Keep the right endpoint exclusive so empty intervals are handled uniformly.

## Walkthrough

Example 1 searches [1, 2, 2, 2, 4] for 2.
The lower-bound search keeps the candidate interval around the first 2 and finishes at index 1.
The upper-bound search passes all three 2 values and finishes at index 4.
Subtracting one gives last index 3, so the answer is [1, 3].

## Complexity

For n sorted values, each binary search takes O(log n) time, so total time is O(log n).
The returned two-element array uses O(1) output space, and the searches use O(1) auxiliary space.
No copy of nums is created.
The method relies on the statement's nondecreasing order guarantee.

## Edge cases

An empty array has no matching boundary and returns [-1, -1].
An absent target is detected by checking the lower-bound value.
A target occurring once produces equal first and last indices.
A target occupying the entire array returns the two outer indices.

## Common mistakes

- Using the same comparison for both bounds loses one side of a duplicate run.
- Returning the upper bound itself makes the last index one too large.
- Continuing after confirming the first target with a linear scan loses logarithmic time.
- Reading nums[first] before checking first equals nums.length risks an out-of-range access.

## Language notes

Python exposes the same logic through a private _bound method.
Java uses an exclusive right endpoint and an explicit boolean to choose lower or upper behavior.
Both methods return a new two-element array or list as specified by the judge.
