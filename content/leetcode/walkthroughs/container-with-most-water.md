## Intuition

A container's capacity is limited by its shorter boundary and the distance between boundaries.
Starting with the widest pair, keep the better boundary and move the shorter one inward.
Any narrower pair retaining that shorter boundary cannot improve on the current capacity, so discarding it is safe.

## Brute force

Compute the area for every pair of lines.
This takes O(n²) time and O(1) space, which is too much for 100,000 heights.

## Approach

1. Use two pointers, `left` at zero and `right` at the final index.
2. Compute `area = (right - left) * min(height[left], height[right])`.
3. Update `best` with the largest area encountered.
4. Advance `left` if its height is smaller; otherwise decrement `right`.
5. Stop when the pointers meet and return `best`.

When the left line is shorter, every alternative pair using that line and a closer right line has smaller width and no greater limiting height.
The symmetric argument applies to the right line.
If heights tie, either endpoint can be discarded; these references discard the right one.

## Walkthrough

Example 1 uses `height = [3, 1, 4, 2, 5]`.

| `left`, `right` | Width | Limiting height | `area` | `best` |
| --- | --- | --- | --- | --- |
| 0, 4 | 4 | 3 | 12 | 12 |
| 1, 4 | 3 | 1 | 3 | 12 |
| 2, 4 | 2 | 4 | 8 | 12 |
| 3, 4 | 1 | 2 | 2 | 12 |

Each left boundary is shorter than the right boundary in this example, so `left` advances until the pointers meet.
The initial pair gives the answer 12.

## Complexity

- Time: O(n), because exactly one pointer moves inward on each iteration.
- Space: O(1), using indices and a running maximum.

## Edge cases

Two entries leave only one possible container.
Zero-height boundaries have zero area and can be discarded normally.
Equal heights do not require examining both discard choices.
The input remains unchanged.

## Common mistakes

- Using the taller boundary overestimates the capacity.
- Moving the taller boundary lacks the safe-discard argument.
- Using `right - left + 1` counts positions instead of their distance.

## Language notes

The implementations use identical pointer logic and variable names.
Java's maximum possible area under these bounds is below 1,000,000,000, so `int` multiplication is safe.
Python supports larger integers automatically, but the same arithmetic bound applies to the problem.
