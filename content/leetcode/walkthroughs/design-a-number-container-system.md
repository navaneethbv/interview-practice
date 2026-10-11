## Intuition

Queries ask for the smallest index per number, and changes move an index from one number to another. A sorted set of indexes per number, plus the number at each index, supports both.

## Approach

1. Keep `at[index]`, the number at each index.
2. Keep `indexes[number]`, a sorted set of indexes holding it.
3. On change, remove the index from its old number's set, then add it to the new number's set.
4. On find, return the smallest element of the number's set, or -1.

## Walkthrough

In Example 1, indexes 2, 1, 3 and 5 all receive 10, so find(10) returns 1. Changing index 1 to 20 removes it from 10's set, so find(10) returns 2.

## Complexity

- Time: O(log n) per call.
- Space: O(n).

## Edge cases

- Changing an index to the number it already holds keeps it in the set.
- Finding a number that was never placed returns -1.

## Common mistakes

- Forgetting to remove the index from the old number's set.
- Scanning all indexes per query.

## Reference notes

The Python reference keeps a heap per number and skips stale indexes lazily.
