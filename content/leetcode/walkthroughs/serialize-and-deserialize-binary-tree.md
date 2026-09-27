## Intuition

Node values alone do not identify where children are missing.
A breadth-first encoding can preserve shape by emitting a placeholder for every null child position.
Decoding then assigns the next two tokens as the left and right children of each queued nonnull node.

## Brute force

Storing only traversal values is ambiguous when shapes differ or values repeat.
Keeping the original tree on the codec object also fails because decoding uses a separate instance.
An explicit null-marker format contains the complete reconstruction information.

## Approach

1. Serialize with BFS, emitting a numeric token for a node or `#` for null.
2. Enqueue both child positions for each nonnull node and separate tokens with commas.
3. During decoding, return null if the first token is `#`; otherwise create the root.
4. Queue each reconstructed nonnull node.
5. Consume two tokens per queued node, allocating and enqueueing children for non-marker tokens.
6. Return the reconstructed root.

The child-token order is always left then right.
Null entries emit no further children, so the encoding remains finite and linear in the number of actual nodes.

## Walkthrough

Example 1 is `[8, 3, 10, null, 6]`.
Its token sequence is `8,3,10,#,6,#,#,#,#`.

| Decoded parent | Next two tokens | Children created |
| --- | --- | --- |
| 8 | `3,10` | Left 3, right 10 |
| 3 | `#,6` | Right 6 only |
| 10 | `#,#` | None |
| 6 | `#,#` | None |

The reconstructed level-order representation is the original `[8, 3, 10, null, 6]`.

## Complexity

- Time: O(n), under the bounded integer-token lengths, for either direction.
- Space: O(n), including tokens, traversal queues, encoded output, or reconstructed nodes.

## Edge cases

An empty tree encodes as `#` and decodes to null.
Negative and repeated values remain unambiguous because structure is recorded separately.
One-sided trees retain their missing child positions.
The decoder consumes valid output from this codec, not arbitrary malformed input.

## Common mistakes

- Omitting null markers can make distinct shapes indistinguishable.
- Enqueueing children for null placeholders never reaches a finite end.
- Reusing encoder instance state violates the separate-instance contract.

## Language notes

Python's `deque` can contain `None`; Java uses `LinkedList` while serializing because `ArrayDeque` rejects null entries.
Java's encoder includes a trailing comma, which its `split` handling tolerates; Python uses `join` without that trailing delimiter.
Both decoders queue only real nodes, and both reconstruct the same shape despite that harmless string-format difference.
