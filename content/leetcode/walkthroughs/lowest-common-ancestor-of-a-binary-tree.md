## Intuition

The tree has no parent pointers, so first record each discovered node's parent.
Once `p` and `q` can both be traced to the root, mark every ancestor of `p`.
Walking `q` upward until it reaches that set finds the deepest shared ancestor.

## Brute force

Starting a fresh root-to-node search for every possible ancestor repeats work and can take O(n²) on a skewed tree.
Comparing every pair of descendants also ignores the useful fact that parent paths contain the answer directly.

## Approach

1. Initialize `parents[root] = None` and explore the tree with `stack` until both targets have parent entries.
2. Walk `p` upward, adding each node to `ancestors`.
3. Walk `q` upward through `parents` until `q` belongs to `ancestors`.
4. Return that node.

## Walkthrough

Example 1 uses root 3 with `p = 5` and `q = 1`.

| phase | nodes or set |
| --- | --- |
| parent discovery | `parents[5] = 3`, `parents[1] = 3` |
| trace `p` | `ancestors = {5, 3}` |
| trace `q` | `q = 1`, then `q = 3` |

Node 3 is the first node on `q`'s upward path that is also on `p`'s path, so it is returned.

## Complexity

- Time: O(n), because each needed tree node is discovered and each target path is walked at most once.
- Space: O(n), for `parents`, the traversal stack, and `ancestors`.

## Edge cases

If one target is the root, the root is its own ancestor and can be returned.
If `p` and `q` are equal, the target itself is the answer.
Targets in opposite subtrees meet at their first shared parent.
The input guarantees that both target nodes belong to the tree.

## Common mistakes

- Comparing node values instead of node identity can confuse duplicate values.
- Stopping parent discovery after finding only one target leaves the other path incomplete.
- Choosing the first ancestor of `p` without walking `q` upward can return a non-lowest node.

## Language notes

Python dictionaries use node objects as keys because the harness supplies actual tree nodes.
Java uses `HashMap<TreeNode, TreeNode>` and a `HashSet<TreeNode>` with identity-based object semantics.
The Java `addChild` helper keeps the traversal branch small and preserves the same algorithm.
