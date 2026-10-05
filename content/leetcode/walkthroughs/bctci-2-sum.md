## Intuition

The sorted order tells us which endpoint can safely move after comparing a pair with zero.
A positive sum needs a smaller right value; a negative sum needs a larger left value.
The two positions must remain distinct, even when both values are zero.

## Brute force

Checking every pair of indices takes O(n squared) time and needs no auxiliary collection.
A hash set also solves the problem, but uses extra memory and ignores the ordering already supplied by the statement.

## Approach

Initialize `left` at zero and `right` at the final index.
While `left < right`, compute `total` from the two endpoint values.
Return true immediately for zero.
If the sum is positive, no pair using this right endpoint and a later left endpoint can work, so decrement `right`.
The symmetric argument justifies incrementing `left` for a negative sum.

## Walkthrough

Example 1 starts with `[-5, -2, -1, 1, 1, 10]`.
The endpoint sum is 5, so `right` moves from the value 10 to 1.
Now the sum is -4, then -1 as `left` advances from -5 to -2.
Advancing again gives -1 plus 1, so the reference returns true.

## Complexity

For n elements, time is O(n) because every unsuccessful comparison moves one pointer inward.
Auxiliary space is O(1); the original array is neither copied nor sorted.

## Edge cases

Empty and singleton arrays return false without indexing invalid positions.
Two zeros return true, while a single zero cannot pair with itself.
Duplicate negative or positive values require no special treatment.

## Common mistakes

Do not move both pointers after a nonzero sum, because that can skip the only valid pair.
Do not use `left <= right`, which permits reusing an index.

## Language notes

Python integers accommodate the sum directly.
Java explicitly casts the first operand to `long` before addition, so evaluation uses wide arithmetic rather than widening an already computed integer result.
