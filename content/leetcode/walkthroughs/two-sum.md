## Intuition

For each `value`, the only number that can complete the pair is `target - value`.
A hash map named `seen` remembers the indices of values already visited, so we can find that complement without scanning the earlier entries again.
Looking up the complement before storing the current value guarantees that the two indices are different.

## Brute force

Try every pair of indices and compare its sum with `target`.
This takes O(n²) time and O(1) extra space, but repeats searches through the same values as the array grows.

## Approach

1. Use the hash map lookup pattern, with `seen` mapping each previously visited value to its index.
2. At `index`, set `value = nums[index]` and `complement = target - value`.
3. If `complement` is in `seen`, return its recorded index and `index`.
4. Otherwise, store `seen[value] = index` and continue.

Before each iteration, every entry in `seen` comes from an earlier position.
Therefore a successful lookup proves both that the sum is correct and that the current entry was not reused.
The statement guarantees that a valid pair exists, so a valid input always returns inside the loop.

## Walkthrough

Example 1 uses `nums = [4, 8, 1, 6]` and `target = 10`.

| `index` | `value` | `complement` | Action |
| --- | --- | --- | --- |
| 0 | 4 | 6 | Missing; store `4: 0` |
| 1 | 8 | 2 | Missing; store `8: 1` |
| 2 | 1 | 9 | Missing; store `1: 2` |
| 3 | 6 | 4 | Found at index 0; return `[0, 3]` |

The values at those indices are 4 and 6, which sum to 10.

## Complexity

- Time: O(n) expected, because each index performs a constant number of average O(1) hash map operations.
- Space: O(n), because `seen` can store almost every input value before the pair is found.

## Edge cases

Duplicate values work because lookup happens before insertion: `[5, 5]` finds the first 5 while processing the second.
Negative values and zero work with the same subtraction rule.
Empty inputs and inputs without a valid pair are outside the stated contract.

## Common mistakes

- Inserting first can incorrectly pair an element with itself.
- Returning the values instead of their indices violates the output contract.
- Sorting without retaining original indices loses the positions the answer needs.

## Language notes

Python uses a dictionary; Java uses `HashMap<Integer, Integer>` and returns an `int[]`.
Under the stated bounds, `complement` lies between -2,000,000,000 and 2,000,000,000, so Java `int` subtraction is safe here.
For a broader input contract, Java would need `long` subtraction and corresponding map keys.
