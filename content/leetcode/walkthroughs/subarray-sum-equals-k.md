## Intuition

Let `running_sum` be the prefix sum through the current value.
An earlier prefix equal to `running_sum - k` leaves a subarray summing to `k` between that earlier position and the current position.
`prefixCounts` stores how many such earlier prefixes exist, so every matching start contributes to the answer.

## Brute force

Enumerating every pair of subarray boundaries and summing each interior segment from scratch takes O(n³).
Prefix sums can reduce that to O(n²), but the frequency map answers every endpoint in constant expected time.

## Approach

1. Initialize `prefixCounts` with sum zero occurring once before the array.
2. Add each value to `running_sum`.
3. Add the count of `running_sum - k` to `answer`.
4. Record the current `running_sum` for future endpoints.

## Walkthrough

Example 1 uses `nums = [1, 1, 1]` and `k = 2`.

| value | `running_sum` | needed prefix | matches added | `answer` |
| ---: | ---: | ---: | ---: | ---: |
| 1 | 1 | -1 | 0 | 0 |
| 1 | 2 | 0 | 1 | 1 |
| 1 | 3 | 1 | 1 | 2 |

The two matches correspond to the first two and last two entries.

## Complexity

- Time: O(n) expected, with one hash-map lookup and update per value.
- Space: O(n), for distinct prefix sums and their frequencies.

## Edge cases

The initial zero prefix counts subarrays that begin at index zero.
Zero values can create several identical prefix sums, and all their counts must contribute.
Negative values work because the prefix identity does not assume monotonic sums.
Overlapping subarrays count separately as required.

## Common mistakes

- Adding the current prefix to the map before querying misses length-one and prefix-start matches.
- Storing only whether a sum appeared loses multiple valid starting positions.
- Sliding windows fail when negative values make the sum non-monotonic.

## Language notes

Python's `Counter` returns zero for a missing prefix count.
Java uses `HashMap` and `getOrDefault`, with `merge` to increment frequencies.
The method's `int` answer matches the spec and the bounded test sizes.
