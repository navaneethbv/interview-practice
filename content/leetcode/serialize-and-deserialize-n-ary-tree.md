# Serialize And Deserialize N Ary Tree

Implement `Codec.serialize(root)` and `Codec.deserialize(data)` for a tree whose nodes have a value and an ordered list of children.
Your string format is unrestricted, but decoding an encoding must recover every value and child position.
The decoder runs on a fresh `Codec` instance.
Test inputs use level-order values: after the root, a `null` starts the root's child group, and later `null` values separate each queued parent's children.
Trailing separators are omitted; an empty array represents an empty tree.

## Examples

```text
Input: root = [1,null,2,3,null,4]
Output: [1,null,2,3,null,4]
Explanation: The root has children 2 and 3; node 2 has child 4.
```

```text
Input: root = []
Output: []
Explanation: An empty tree must survive a round trip.
```

## Constraints

- 0 <= number of nodes <= 10,000
- Node values fit signed 32-bit integers.
- Child order is significant.
