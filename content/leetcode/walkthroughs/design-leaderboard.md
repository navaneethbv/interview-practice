## Intuition

Updates change one player's total, while `top` needs the largest totals. A hash map from player to total plus an ordered multiset of totals serves both.

## Approach

1. Keep `scores[player]`.
2. Keep a sorted multiset of all totals (a TreeMap from total to count).
3. On `addScore`, remove the player's old total from the multiset, add the new one.
4. On `top(K)`, walk the multiset from the largest total, taking up to K values.
5. On `reset`, remove the player's total from both structures.

## Walkthrough

In Example 1 the totals are 73, 56, 39, 51 and 4, so `top(1)` is 73. Resetting players 1 and 2 leaves 39, 51 and 4; adding 51 for player 2 gives 51, 51, 39, 4, and `top(3)` is 141.

## Complexity

- Time: O(log n) per update, O(K) per top.
- Space: O(n).

## Edge cases

- Two players can have the same total; the multiset keeps a count.
- Re-adding a reset player starts from zero.

## Common mistakes

- Sorting all totals on every `top`, O(n log n) per call.
- Forgetting to remove the old total before inserting the new one.
