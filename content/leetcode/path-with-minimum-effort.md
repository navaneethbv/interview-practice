# Path With Minimum Effort

Move from the top-left to the bottom-right of heights using four-directional steps.
A path's effort is the largest absolute height difference across any one of its steps.
Return the smallest possible effort.

## Constraints

- Dimensions range from 1 to 100.
- Heights are positive integers no greater than 1000000.

## Examples

### Example 1

```text
Input: heights = [[1, 3], [2, 4]]
Output: 2
Explanation: Either two-step route has maximum change 2.
```

### Example 2

```text
Input: heights = [[7]]
Output: 0
Explanation: A path with no steps requires no effort.
```
