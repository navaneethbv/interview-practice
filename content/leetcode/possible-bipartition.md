# Possible Bipartition

Divide people numbered 1 through n into two groups so that each disliked pair belongs to different groups.
Return whether such a division exists.
People with no dislikes can join either group.

## Examples

### Example 1

```text
Input: n = 4, dislikes = [[1, 2], [1, 3], [2, 4]]
Output: true
Explanation: Use groups {1,4} and {2,3}.
```

### Example 2

```text
Input: n = 3, dislikes = [[1, 2], [2, 3], [1, 3]]
Output: false
Explanation: Three pairwise dislikes cannot fit into two groups.
```

## Constraints

- 1 <= n <= 2000.
- 0 <= dislikes.length <= 10000.
- Each pair contains two distinct valid people, with no duplicate pairs.
