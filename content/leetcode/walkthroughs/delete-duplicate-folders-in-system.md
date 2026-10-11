## Intuition

Two folders are identical exactly when their subtrees, excluding their own names, have the same shape and names. Serializing each subtree canonically (children sorted by name) turns that comparison into string equality, which a counter can detect across the whole tree.

## Approach

1. Insert every path into a trie.
2. Post-order, build each folder's signature from its sorted children: `(name signature)` for each child.
3. Count non-empty signatures.
4. Walk the trie again, skipping any folder whose non-empty signature occurs more than once, and output the remaining paths.

## Walkthrough

In Example 1, folders a and c each contain only an empty b, so both have signature (b). It appears twice, so a and c, with their b subfolders, are deleted. d contains a, signature (a), which is unique, so d and d/a remain.

## Complexity

- Time: O(total path length * log).
- Space: O(total path length).

## Edge cases

- Empty folders are never identical to each other: their signature is empty and is not counted.
- Deletions are decided before any folder is removed, so a parent is not compared after its children vanish.

## Common mistakes

- Including the folder's own name in its signature.
- Not sorting children, so identical folders listed in a different order get different signatures.
- Treating two empty folders as duplicates.
