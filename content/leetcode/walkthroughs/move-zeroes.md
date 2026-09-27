## Intuition

The nonzero values must keep their relative order, while zeroes can fill the remaining suffix.
Use `write_index` to mark where the next nonzero belongs and scan with `read_index`.
Swapping a discovered nonzero into that position preserves the already processed prefix.

## Brute force

Repeatedly removing each zero and appending it to the end can shift O(n) values for every zero, taking O(n²) time.
Building a separate nonzero list takes O(n) time but uses O(n) extra space, while the two-index pass is in place.

## Approach

1. Set `write_index = 0`.
2. For every `read_index`, skip zeroes.
3. For a nonzero value, swap it with `nums[write_index]` and advance `write_index`.
4. The untouched suffix contains all zeroes after the final nonzero has been placed.

## Walkthrough

Example 1 starts with `[0,1,0,3,12]`.

| `read_index` | value | array after action | `write_index` |
| ---: | ---: | --- | ---: |
| 0 | 0 | `[0,1,0,3,12]` | 0 |
| 1 | 1 | `[1,0,0,3,12]` | 1 |
| 2 | 0 | `[1,0,0,3,12]` | 1 |
| 3 | 3 | `[1,3,0,0,12]` | 2 |
| 4 | 12 | `[1,3,12,0,0]` | 3 |

The nonzero order is preserved and zeroes finish the array.

## Complexity

- Time: O(n), with one scan and constant-time swaps.
- Space: O(1), using two indices and one temporary swap value.

## Edge cases

An all-zero array remains unchanged.
An array without zeroes performs only self-swaps.
Zeroes at the beginning or end are handled by the same write boundary.
Negative values are treated as nonzero values.

## Common mistakes

- Sorting changes the order of nonzero values.
- Copying only nonzero values without filling the suffix leaves stale entries.
- Advancing `write_index` for zeroes creates gaps inside the nonzero prefix.

## Language notes

Python uses tuple assignment for swaps.
Java uses a temporary integer and increments `writeIndex` after assigning the nonzero.
Both methods mutate the output argument in place and return nothing.
