## Intuition

Only the two endpoints determine whether a subarray qualifies.
Interior days may be good or bad, so their values impose no additional condition.
Once the good positions are known, each pair of them determines exactly one valid interval.

## Brute force

One could examine all start and end positions and test whether both sales values are at least 10.
That requires O(n squared) endpoint checks even though every check depends on the same simple classification.

## Approach

Count the number of good days in `good`.
Choosing two distinct good positions gives `good * (good - 1) / 2` intervals, with their chronological order determining start and end.
Each individual good day also gives a valid singleton interval.
Adding those singletons simplifies the formula to `good * (good + 1) / 2`.
No window, prefix sum, or storage of the actual good indices is necessary.

## Walkthrough

In Example 1, `[0, 20, 5, 15, 10]` has good positions 1, 3, and 4.
The three singleton intervals qualify.
The endpoint pairs `(1, 3)`, `(1, 4)`, and `(3, 4)` give three more.
The bad value 5 between some of these endpoints does not matter.
Thus `good = 3` and the formula returns 6.

## Complexity

Scanning n sales values takes O(n) time.
Only the counter and arithmetic result are stored, giving O(1) auxiliary space.
The count itself can be quadratic in n despite the linear scan.

## Edge cases

An empty array or an array containing no good days returns zero.
One good day gives one valid subarray, regardless of surrounding bad days.
If all n days are good, every nonempty interval qualifies.

## Common mistakes

Do not require the interior to be good.
Do not omit single-day intervals or count the same two endpoints in both orders.

## Language notes

Python uses integer division after multiplying.
Java declares `good` as `long`, ensuring the multiplication is performed in wide arithmetic before division.
