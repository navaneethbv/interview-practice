# Tree Diameter

Return the maximum number of edges on a path between any two nodes of a binary tree.
For this runner, the tree is represented by parallel arrays: `labels[i]` is node i's string value and `children[i] = [left, right]` contains child indices, using -1 for a missing child.
Node 0 is the root of a nonempty tree.
An empty tree has answer 0.
Labels do not affect distances.

## Constraints

- 0 <= labels.length = children.length <= 10,000.
- Labels are unique lowercase strings of length 1 to 10.
- Child indices describe a valid connected binary tree with no cycles or shared children.


## Examples

### Example 1

```text
Input: [["a", "b", "c"], [[1, 2], [-1, -1], [-1, -1]]]
Output: 2
```

### Example 2

```text
Input: [[], []]
Output: 0
```
