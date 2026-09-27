## Intuition

The first differing letters in two adjacent sorted words reveal one required alphabet relation.
Later letters in that pair reveal nothing because lexicographic comparison has already been decided.
Collect these relations into a directed graph, then topologically order all observed letters.

## Brute force

Try every permutation of the distinct alphabet and check whether it sorts the words.
With K letters this requires up to K! candidate orders.
Graph constraints let us construct a valid order directly or detect why none exists.

## Approach

1. Register every observed letter in `edges` and `degree`, including letters with no constraints.
2. For each adjacent word pair, add an edge from its first differing letter to the corresponding later letter.
3. Add each edge only once so repeated evidence does not inflate indegrees.
4. If the words never differ and the first is longer, return an empty string for an invalid prefix ordering.
5. Run Kahn's topological sort, starting with sorted zero-degree letters and processing outgoing neighbors in sorted order.
6. Return the collected letters only if all registered letters were processed; otherwise a cycle exists.

## Walkthrough

Example 1 supplies `["za", "zb", "ca", "cb"]`.

| Adjacent pair | New relation |
| --- | --- |
| `za`, `zb` | `a -> b` |
| `zb`, `ca` | `z -> c` |
| `ca`, `cb` | Existing `a -> b`; do not count twice |

The initial queue is `[a, z]`.
Processing a appends b; processing z appends c; then b and c finish the traversal.
These references return `azbc`, a valid alternative to the statement's `abzc`: both place a before b and z before c.
The problem permits any valid alphabet order.

## Complexity

Let D be the total input character count.

- Time: O(D) under the fixed 26-letter alphabet; map and sorting work on letters is bounded by that alphabet size.
- Space: O(1) auxiliary space relative to D, since at most 26 vertices and 26² distinct edges can be stored.

## Edge cases

Identical adjacent words add no relation.
A longer word before its own prefix is invalid even without a graph cycle.
Unconstrained letters still appear in the result.
Contradictory relations leave some indegrees positive and produce an empty string.

## Common mistakes

- Comparing letters after the first mismatch invents unsupported constraints.
- Counting the same edge twice can falsely block a letter.
- Forgetting isolated letters yields an incomplete alphabet.

## Language notes

Python sorts the initial queue and each outgoing set explicitly.
Java uses `TreeMap` and `TreeSet` to obtain the same deterministic ordering.
Neither implementation promises the lexicographically smallest valid answer; newly freed letters join the end of the FIFO queue.
