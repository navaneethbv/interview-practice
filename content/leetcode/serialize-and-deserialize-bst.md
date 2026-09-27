# Serialize and Deserialize BST

Implement a Codec with `serialize(root)` and `deserialize(data)`.
Serialization must produce a string that your deserializer can use to reconstruct the same binary search tree.
You may choose any lossless representation; keeping it compact is encouraged.
The judge runs both methods and compares the reconstructed tree, so displayed outputs are trees rather than a prescribed encoded string.

## Examples

### Example 1

```text
Input: root = [4, 2, 6, 1, 3, 5, 7]
Output: [4, 2, 6, 1, 3, 5, 7]
Explanation: A serialization round trip preserves every node and child link.
```

### Example 2

```text
Input: root = []
Output: null
Explanation: An empty tree must decode back to a null root.
```

## Constraints

- The tree contains 0 to 10000 nodes.
- 0 <= node.val <= 10000, and values are distinct.
- The input satisfies strict binary search ordering.
