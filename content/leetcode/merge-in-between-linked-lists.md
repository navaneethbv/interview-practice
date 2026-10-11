# Merge In Between Linked Lists

Remove the nodes of `list1` from index `a` through index `b` (0-indexed, inclusive) and put all of `list2` in their place.
Return the head of the resulting list.

## Constraints

- 3 <= list1.length <= 10^4
- 1 <= a <= b < list1.length - 1
- 1 <= list2.length <= 10^4

## Examples

### Example 1

```text
Input: list1 = [10, 1, 13, 6, 9, 5], a = 3, b = 4, list2 = [100, 101, 102]
Output: [10, 1, 13, 100, 101, 102, 5]
Explanation: Nodes 6 and 9 are replaced by list2.
```

### Example 2

```text
Input: list1 = [0, 1, 2, 3], a = 1, b = 2, list2 = [7]
Output: [0, 7, 3]
Explanation: The middle two nodes become a single node.
```
