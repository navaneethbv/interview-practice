# Delete Nodes And Return Forest

Delete every tree node whose value appears in to_delete, along with its incident links.
Return the roots of the remaining trees in any order.
All original node values are distinct.

## Examples

### Example 1

```text
Input: root = [1, 2, 3, 4, 5, 6, 7], to_delete = [3, 5]
Output: [[1, 2, null, 4], [6], [7]]
Explanation: Removing 3 creates separate trees rooted at 6 and 7; removing 5 deletes that leaf.
```

### Example 2

```text
Input: root = [1], to_delete = [1]
Output: []
Explanation: Deleting the only node leaves no trees.
```

## Constraints

- 1 <= number of nodes <= 1000
- Node values are distinct integers from 1 through 1000.
- 0 <= to_delete.length <= 1000; values in to_delete are distinct.
