## Intuition
After each full left-to-right or right-to-left pass, the remaining values form an arithmetic progression.
Only its first value, spacing, direction, and count are needed, so the original list never needs to be materialized.

## Brute force
Building and deleting from a list simulates every pass but can require quadratic shifting work.
The progression state halves the count on every pass.

## Approach
1. Start with first value 1, spacing 1, count n, and left-to-right direction.
2. Advance the first value when deleting from the left, or when an odd count forces the right-to-left pass to remove its first element.
3. Halve the count, double the spacing, and flip direction.
4. Return the sole remaining first value.

## Walkthrough
For Example 1, `n = 9` starts as `[1,2,3,4,5,6,7,8,9]`.
The left-to-right pass keeps `[2,4,6,8]`, so first value becomes 2, spacing 2, count 4.
The right-to-left pass keeps `[2,6]`, so first value stays 2, spacing becomes 4, count 2.
The next left-to-right pass keeps `[6]`, moving first value to 6, which is the answer.

## Complexity
The count halves each round, so time is O(log N).
The progression variables use O(1) auxiliary space.

## Edge cases
For n equal to one, the loop does not run and returns one.
An odd count during a right-to-left pass shifts the first value because the leftmost survivor is removed.
Direction alternates after every pass.

## Common mistakes
Always advancing the first value ignores the even-count right-to-left case.
Doubling the first value instead of the spacing misrepresents later survivors.
Using the original count after a pass prevents the logarithmic reduction.

## Language notes
Python uses integer division for the halved count.
Java uses the same state machine with integer division and a boolean direction flag.
