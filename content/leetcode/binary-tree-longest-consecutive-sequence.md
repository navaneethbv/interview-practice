# Binary Tree Longest Consecutive Sequence

Find the longest downward path whose values increase by exactly one at every step.
A path may begin at any node but must proceed from a parent to a child.
Return the number of nodes on that path.

## Examples

```text
Input: root = [1,null,3,2,4,null,null,null,5]
Output: 3
Explanation: The downward path 3,4,5 has three nodes.
```

```text
Input: root = [2,3,1]
Output: 2
Explanation: The path from 2 to its child 3 has length two.
```

## Constraints

- The tree contains between 1 and 30,000 nodes.
- Node values are signed 32-bit integers.
