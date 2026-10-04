## Intuition

Every allowed value after one is a previous allowed value multiplied by 3, 5, or 7.
These form three sorted candidate streams.
Merging their smallest unseen values generates the sequence in order without checking unrelated integers.
Duplicate stream values must advance together.

## Brute force

Examine positive integers in order, repeatedly divide out factors 3, 5, and 7, and retain numbers whose remainder is one.
Large gaps between valid numbers make this inefficient for later sequence positions.

## Approach

Start `values` with 1 and one pointer for each factor in `(3, 5, 7)`.
Compute each candidate as its factor times the value at its pointer.
Append the smallest candidate.
Advance every pointer whose candidate equals that smallest value.
Each stream pointer then refers to its first product not yet emitted.
Continue until k values exist and return `values[k - 1]`.
Advancing all matching streams suppresses duplicates such as 15, which can arise as 3 times 5 or 5 times 3.

## Walkthrough

Example 1 asks for the sixth value.
Starting from 1, the smallest candidates successively produce 3, 5, 7, and 9.
The next candidates include 15 from both the factor-3 and factor-5 streams.
Append it once and advance both corresponding pointers.
The first six values are `[1, 3, 5, 7, 9, 15]`, so return 15.

## Complexity

There are a fixed three streams, so each emitted value requires O(1) candidate work.
Time is O(k), and retained sequence storage is O(k).
Pointer storage is constant.

## Edge cases

The first value is one, even though it has no prime factors.
Values shared by two or all three streams must appear once.

## Common mistakes

Advancing only one matching pointer produces duplicate values on later iterations.
Using k directly as an array index creates an off-by-one error.

## Language notes

Python integers grow automatically.
Java uses long sequence values and factors so the supported sequence range is not restricted to signed-int products.
