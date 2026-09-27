# Find the Corresponding Node in a Cloned Tree

You receive an original binary tree, a separate clone with the same shape and values, and a target node from the original tree.
Return the corresponding node object from the cloned tree.
Do not modify either tree or return the original target object.
The testcase identifies target by its value, while the method receives the actual original node reference.
The judge checks that the returned object belongs to the clone and displays its value.

## Examples

```text
Input: original = [7,4,3,null,null,6,19], cloned = [7,4,3,null,null,6,19], target = 3
Output: 3
Explanation: Return the clone's right child, not the original tree's right child.
```

```text
Input: original = [1,null,2,null,3], cloned = [1,null,2,null,3], target = 2
Output: 2
Explanation: The corresponding node occupies the same path from the clone's root.
```

## Constraints

- Each tree has between 1 and 10,000 nodes.
- Values in each test are distinct signed 32-bit integers.
- The two trees have identical shapes and matching values but share no node objects.
- target is a node in original.
- A simultaneous traversal also works if values are allowed to repeat.
