# House Robber III

Each tree node is a house holding its value in money.
Select houses with maximum total value without selecting both a parent and its child.
Return the largest obtainable total.

## Examples

### Example 1

```text
Input: root = [3, 2, 3, null, 3, null, 1]
Output: 7
Explanation: Take the root and the two grandchildren, totaling 3 + 3 + 1.
```

### Example 2

```text
Input: root = [3, 4, 5, 1, 3, null, 1]
Output: 9
Explanation: Take the root's two children, with values 4 and 5.
```

## Constraints

- The tree contains 1 through 10,000 nodes.
- 0 <= Node.val <= 10,000
