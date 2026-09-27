## Intuition

A copied pointer must target the copy of its original destination, even if that destination appears later in the list.
First allocate every new node, then connect the copies using an original-to-copy map.
This separates finding destinations from assigning links.

## Brute force

After copying the next-chain, one could locate every random target by scanning the original list for its index and then scanning the copy to that index.
Those repeated searches take O(n²) time.
A map makes each destination lookup expected O(1).

## Approach

1. Use the two-pass hash map pattern, with `copies` mapping original node identities to newly allocated nodes.
2. Traverse the original next-chain with `current`, allocating one copy with the same value per node.
3. Traverse the original next-chain again.
4. Set each copy's `next` to the mapped original next node.
5. Set its `random` to the mapped original random target.
6. Return the mapped original head.

All copies exist before any pointers are connected, so forward, backward, and self-directed random links work identically.
No original pointer is modified.
An interleaving technique can reduce auxiliary space by temporarily weaving copies into the input, but these references retain the explicit mapping for clarity and preserve the input throughout.

## Walkthrough

Example 1 represents two nodes as `[[5, 1], [7, 0]]`.
Call their identities A and B, and their copies A' and B'.

| Pass | Original | Action |
| --- | --- | --- |
| Allocate | A, value 5 | Store `copies[A] = A'` |
| Allocate | B, value 7 | Store `copies[B] = B'` |
| Connect | A | Set A'.next and A'.random to B' |
| Connect | B | Set B'.next to null and B'.random to A' |

The serialized output is unchanged, but both output nodes have new identities.

## Complexity

- Time: O(n) expected, for two traversals and constant expected map operations per node.
- Space: O(n) auxiliary map storage, plus O(n) newly allocated output nodes.

## Edge cases

An empty head returns null.
A self-random pointer resolves to the same node's copy.
Repeated values remain distinct because the map uses node identities, not their `val` fields.
Random-pointer cycles do not affect termination because traversal follows only `next`.

## Common mistakes

- Copying values while retaining original random pointers is not a deep copy.
- Keying the map by value merges distinct nodes with equal values.
- Assigning forward links before allocating their targets produces missing copies.

## Language notes

Python explicitly maps `None` to `None`.
Java's `IdentityHashMap.get(null)` returns null for the absent null key, supplying the same link behavior.
The harness supplies `Node`; neither reference needs to declare a replacement helper class.
