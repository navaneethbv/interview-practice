## Intuition

Halving a pile removes more stones the larger the pile is, and an operation never makes another pile's best choice worse. So each operation should take from the current largest pile, which a max-heap provides.

## Approach

1. Put all piles in a max-heap.
2. k times, pop the largest pile, remove floor(pile / 2) stones, and push it back.
3. Return the sum of the heap.

## Walkthrough

In Example 1, 9 becomes 5, removing 4, and then a 5 becomes 3, removing 2. The total is 18 - 6 = 12.

## Complexity

- Time: O(n + k log n).
- Space: O(n).

## Edge cases

- A pile of 1 removes 0 stones, so extra operations on small piles cost nothing.
- The same pile can be chosen repeatedly.

## Common mistakes

- Rounding the remaining pile down instead of the removed amount: a pile of 5 keeps 3, not 2.
- Sorting once instead of using a heap, since piles change order after each operation.
