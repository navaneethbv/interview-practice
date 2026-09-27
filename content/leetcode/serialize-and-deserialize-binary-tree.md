# Serialize and Deserialize Binary Tree

Implement `Codec.serialize(root)` to convert any binary tree to a string and `Codec.deserialize(data)` to rebuild the tree from that string.
You choose the string format.
The decoded tree must have the original shape and values.
Encoding and decoding run on separate Codec instances, so store all necessary information in the string.
The judge reports the decoded tree as a level-order array; it does not compare your encoded string.

## Constraints

- A tree contains 0 to 10000 nodes.
- Values range from -1000 to 1000.

## Examples

### Example 1

```text
Input: root = [8, 3, 10, null, 6]
Output: [8, 3, 10, null, 6]
Explanation: Decoding the encoded string reconstructs every node and missing child.
```

### Example 2

```text
Input: root = []
Output: null
Explanation: An empty tree must also round-trip.
```
