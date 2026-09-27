## Intuition

An array gives constant-time random access, while a map gives constant-time lookup of a value's array index.
To remove an element without shifting the suffix, move the last value into its slot and update that value's map entry.
Choosing a random array position then returns a uniformly selected current value.

## Brute force

Keeping only a list makes insertion lookup and removal O(n) when searching for a value.
Keeping only a set gives lookup but cannot select a uniformly random element by index, so the array and map are paired.

## Approach

1. On `insert`, reject values already in `index`, then append the value and store its position.
2. On `remove`, reject absent values, remove the map entry, and pop the last array value.
3. If the removed slot was not last, move `last_value` there and update its index.
4. On `getRandom`, use the seeded random generator to choose an array element uniformly.

## Walkthrough

Example 1, the first statement block, inserts 4 and 9, calls `getRandom`, removes 4, then calls `getRandom`.

| operation | `values` | `index` | accepted result |
| --- | --- | --- | --- |
| `insert(4)` | `[4]` | `{4:0}` | true |
| `insert(9)` | `[4,9]` | `{4:0,9:1}` | true |
| `getRandom()` | `[4,9]` | unchanged | 4 or 9 |
| `remove(4)` | `[9]` | `{9:0}` | true |
| `getRandom()` | `[9]` | unchanged | 9 |

The first random answer is nondeterministic under the validator, so either current value is valid.

## Complexity

- Time: O(1) average for each operation, using hash lookup, append, swap-with-last, or indexed random access.
- Space: O(n), for the values array and index map.

## Edge cases

Duplicate insertion returns false without changing either structure.
Removing an absent value returns false.
Removing the final array element needs no replacement update.
`getRandom` is called only while the set is nonempty.

## Common mistakes

- Removing from the middle without moving the last value costs O(n).
- Forgetting to update the moved value's index breaks future removals.
- Treating one seeded draw as the only valid answer conflicts with the random-result validator.

## Language notes

Python uses a list, dictionary, and `random.Random(0)`.
Java uses `ArrayList`, `HashMap`, and `Random(0)` with the same swap-with-last invariant.
The seed makes local reference runs reproducible while the judge still accepts every valid random value.
