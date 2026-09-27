## Intuition
A tree can be serialized losslessly when every node records its value and the number of children that follow it.
The decoder reads those same records in preorder with an explicit stack, so it knows exactly where each child list ends.

## Brute force
A naive format could write only node values and separator markers, then repeatedly scan for matching boundaries during decoding.
For N nodes, repeated boundary scans can reach O(N^2) time.
The serialized string still requires O(N) output space.

## Approach
1. Encode a null root as `#`.
2. Encode each non-null node as its value, child count, and stack-ordered children.
3. Decode tokens from left to right with parent frames.
4. Create a node, read its child count, and decode exactly that many children.

## Walkthrough
Example 1 uses the level-order N-ary tree `[1, null, 2, 3, null, 4]`.
The input represents root `1` with children `2` and `3`, and node `2` has child `4`.
Serialization writes node 1 with child count 2, then node 2 with count 1, then leaf 4 with count 0, and finally leaf 3 with count 0.
Deserialization creates a frame for node 1 with two children remaining, then consumes exactly those two child subtrees.
The first child reads 2 and count 1, which consumes node 4 as its only child.
The second child reads 3 and count 0.
The reconstructed tree therefore has the same values and child order.

## Complexity
For N nodes and serialized length L, encoding and decoding take O(N + L) time.
The serialized string uses O(L) output space.
The explicit traversal stack can hold O(N) sibling nodes in a wide tree, and decoded nodes use O(N) space.
Tokenization and output construction require O(L) storage, giving O(N + L) peak auxiliary space in either language.

## Edge cases
A null root round trips through the `#` marker.
A leaf records child count zero.
Child order is preserved because children are encoded and decoded sequentially.

## Common mistakes
Writing only values loses the child grouping.
Reading until end of input instead of honoring child counts attaches siblings incorrectly.
Using a delimiter that can occur in a value would make tokenization ambiguous.

## Language notes
Python and Java both write a preorder value and child-count stream iteratively.
Both decoders keep explicit parent frames, so a valid deep tree does not consume language recursion depth.
Java tokenization likewise creates O(L) token storage before decoding.
