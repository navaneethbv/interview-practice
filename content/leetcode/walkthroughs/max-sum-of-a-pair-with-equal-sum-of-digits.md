## Intuition

Only numbers with the same digit sum can pair, and within a group the best pair is the two largest values. Scanning once and remembering the largest value per digit sum finds each group's best pair as its second-largest member arrives.

## Approach

1. Compute each number's digit sum.
2. If that sum was seen before, the best partner is the largest earlier value with that sum; update the answer.
3. Store the larger of the current value and the stored one.

## Walkthrough

In Example 1, 18 has digit sum 9 and is stored. 36 also sums to 9, so 18 + 36 = 54 becomes the answer. 13 and 43 never beat it.

## Complexity

- Time: O(n log max).
- Space: O(n).

## Edge cases

- A group with one member contributes nothing.
- Values up to 10^9 sum to at most 2 * 10^9, which still fits in a signed 32-bit integer.

## Common mistakes

- Pairing a number with itself.
- Keeping only the most recent value per sum instead of the largest.
