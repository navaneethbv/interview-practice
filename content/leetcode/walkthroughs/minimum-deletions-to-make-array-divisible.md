## Intuition

A number divides every value in `numsDivide` exactly when it divides their greatest common divisor.
After sorting nums, the first value dividing that gcd requires the fewest deletions before it.

## Brute force

Testing every candidate against every target costs O(nm).
Reducing the target array to one gcd makes each candidate one divisibility test.

## Approach

1. Compute the gcd of all `numsDivide` values.
2. Sort `nums` ascending.
3. Return the index of the first value dividing the gcd.
4. Return -1 if no value works.

## Walkthrough

For Example 1, the gcd of `[9,6,9,3,15]` is 3.
Sorted nums is `[2,2,3,3,4]`.
The first two values fail `3 % value == 0`, while 3 succeeds at index 2, so deleting two entries is enough.

## Complexity

Gcd reduction costs O(m log V), sorting costs O(n log n), and the scan costs O(n), where V is the value magnitude.
Python's `sorted` makes an O(n) copy and uses its sort workspace, while Java's `Arrays.sort` mutates the array and uses O(log n) stack space for primitive sorting.

## Edge cases

If the gcd is not divisible by any nums value, return -1.
Duplicate candidates count as separate deletions.
A value equal to the gcd is immediately valid.
Removing values after the first valid divisor is unnecessary because the remaining array may keep that divisor as its smallest element.

## Common mistakes

Use the gcd of numsDivide, not its minimum value.
Count sorted entries before the first valid divisor.
Do not divide the target values one by one for every candidate.

## Language notes

Python uses `functools.reduce` with `math.gcd`.
Java implements iterative Euclidean gcd and uses integer remainder.
