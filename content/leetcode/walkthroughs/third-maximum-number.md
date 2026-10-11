## Intuition

Only the three largest distinct values matter. Keeping them in three slots, shifting down when a larger value arrives and skipping duplicates, finds them in one pass without sorting.

## Approach

1. Keep first, second and third, initially empty.
2. Skip a value equal to any of them.
3. Insert it into the right slot, shifting smaller ones down.
4. Return third if it exists, otherwise first.

## Walkthrough

For [2, 2, 3, 1], the slots become 2, then 3 and 2, then 3, 2 and 1. The answer is 1.

## Complexity

- Time: O(n).
- Space: O(1).

## Edge cases

- The smallest 32-bit integer can be a real value, so use empty markers, not a sentinel number.
- Fewer than three distinct values returns the maximum.

## Common mistakes

- Counting duplicates as separate maxima.
- Using Integer.MIN_VALUE as a sentinel, which breaks when it appears in the input.
