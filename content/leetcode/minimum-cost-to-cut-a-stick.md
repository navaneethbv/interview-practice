# Minimum Cost to Cut a Stick

A stick spans positions 0 through n.
Make every requested cut, in any order.
A cut costs the length of the current piece being cut.
Return the minimum total cost.

## Examples

### Example 1

```text
Input: n = 7, cuts = [1, 3, 4, 5]
Output: 16
Explanation: Cut at 3 first, then order the remaining cuts within the resulting pieces.
```

### Example 2

```text
Input: n = 9, cuts = [5, 6, 1, 4, 2]
Output: 22
Explanation: Choosing the cut order carefully minimizes repeated cutting of long pieces.
```

## Constraints

- 2 <= n <= 10^6
- 1 <= cuts.length <= 100
- Cut positions are distinct integers strictly between 0 and n.
