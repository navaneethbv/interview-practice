## Intuition

We do not need to choose a particular jump sequence while scanning.
Instead, track `farthest`, the greatest index reachable from positions already examined.
Because each jump may be shorter than its maximum, all intervening positions are reachable too, forming a continuous reachable prefix.

## Brute force

Recursively try every allowed jump length from each position.
This can revisit the same positions through many paths and take exponential time.
A DP can avoid repeated states, but the reachable-prefix invariant reduces the state to one boundary.

## Approach

1. Use a greedy reachability scan with `farthest = 0`.
2. At each `index`, return false if it lies beyond `farthest`, since this position cannot be reached.
3. Otherwise extend `farthest` with `index + nums[index]` if that is larger.
4. Return true as soon as `farthest` reaches or passes the final index.
5. Continue scanning only while the answer remains undecided.

Updating only from reachable positions is essential.
An unreachable position with a large jump length cannot help cross the gap before it.
The maximum boundary retains all useful earlier options without committing to a specific route.

## Walkthrough

Example 1 uses `nums = [2, 0, 2, 0, 1]`.

| `index` | Jump allowance | Incoming `farthest` | New `farthest` | Decision |
| --- | --- | --- | --- | --- |
| 0 | 2 | 0 | 2 | Continue |
| 1 | 0 | 2 | 2 | Continue |
| 2 | 2 | 2 | 4 | Final index reached |

Return true without needing to scan indices 3 and 4.
One witness route is index 0 to index 2 to index 4.

## Complexity

- Time: O(n), with at most one visit per index.
- Space: O(1), maintaining only the reach boundary and current index.

## Edge cases

A singleton is already at the destination and returns true, even if its value is zero.
A zero before the destination blocks progress only when no earlier jump can pass it.
A jump extending beyond the array is sufficient because choosing a shorter jump is allowed.

## Common mistakes

- Always taking the largest available jump can land at an avoidable dead end.
- Extending reach from an unreachable position incorrectly crosses gaps.
- Requiring exact equality with the final index rejects valid overshooting allowances.

## Language notes

Python gets `index` and `distance` from `enumerate`, while Java reads `nums[index]` directly.
Both references use the same early success and failure checks.
The maximum index-plus-distance under the stated bounds safely fits Java `int`.
