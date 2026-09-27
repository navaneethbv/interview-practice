## Intuition
A BST can be serialized with preorder values alone because a monotonic ancestor stack recovers the same child relationships.
Deserialization consumes the preorder stream iteratively and uses that stack to find the nearest ancestor that accepts a larger value as its right child.

## Brute force
Serializing with null markers records the full tree shape, but it uses O(N) additional marker storage.
The BST property lets this reference omit null markers while retaining unambiguous reconstruction.

## Approach
1. Visit each node preorder and append its value separated by commas.
2. During deserialization, create each next preorder node from the token stream.
3. Attach a smaller value to the stack top's left child.
4. For a larger value, pop smaller ancestors and attach it to the last popped node's right child.

## Walkthrough
Example 1 is the BST level order `[4,2,6,1,3,5,7]`.
Preorder serialization produces `4,2,1,3,6,5,7`.
Reading 4 creates the root, 2 is accepted below it, and 1 is accepted below 2.
The next value 3 is outside 1's interval but fits 2's right interval, then 6 and its children fill the right side.
The reconstructed tree has the original level order.

## Complexity
Each node is serialized and consumed once, so the traversal work is O(N).
The output string and split token array each hold O(N) values, and the explicit ancestor stack uses O(H) live nodes.
The iterative form avoids Python recursion depth failures on a long valid BST chain.

## Edge cases
An empty tree serializes to an empty string and deserializes to `None`.
Deserialization assumes a valid serialized BST preorder stream; it does not validate arbitrary malformed tree encodings.
Single-node trees consume one value and leave no children.

## Common mistakes
When popping ancestors for a larger value, attach the node to the last popped ancestor, not the remaining stack top.
Push every newly attached node so later values can become its descendants.
Serializing inorder alone loses the tree shape even though it is sorted.

## Language notes
Python parses a list of integers and iterates over a copied suffix during reconstruction.
Java splits into string tokens and parses each value while traversing an `ArrayDeque` of ancestors.
Both allocate O(N) token storage in addition to the output tree, with bounded-width node values.
