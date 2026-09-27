## Intuition

A valid path must start at the root, end at a leaf, and use parent-to-child edges.
Maintain one mutable `current_path` while descending and subtract each node from `remaining_sum`.
Copy the path only when a leaf reaches zero, then pop the node while backtracking.

## Brute force

Enumerating every root-to-leaf path and recomputing each path sum from its values takes O(nh) time for tree height h.
Keeping a fresh copied path in every pending stack state can also use O(h²) temporary storage when sibling branches remain pending at many depths.
The shared path avoids those repeated copies while retaining each successful output copy.

## Approach

1. Initialize `paths`, an empty `current_path`, and a stack containing an entering visit for the root.
2. For an entering visit, append the value and subtract it from `remaining_sum`.
3. At a leaf, copy `current_path` only when `remaining_sum` is zero.
4. Push a leaving visit for this node, then entering visits for its right and left children.
5. A leaving visit pops the path, restoring its parent prefix before the next sibling is processed.

This explicit depth-first traversal avoids the call-stack limit on a deeply skewed tree.

## Walkthrough

Example 1 uses `root = [1, 2, 3]` and `targetSum = 3`.

| node visited | `current_path` | `remaining_sum` | action |
| --- | --- | ---: | --- |
| enter 1 | `[1]` | 2 | schedule leave 1, enter 3, enter 2 |
| enter 2 | `[1, 2]` | 0 | leaf match, copy path |
| leave 2 | `[1]` | 0 | pop 2 |
| enter 3 | `[1, 3]` | -1 | leaf mismatch |
| leave 3 | `[1]` | -1 | pop 3 |
| leave 1 | `[]` | 2 | pop root |

The result is `[[1, 2]]`.

## Complexity

- Time: O(n + Rh), where n is nodes and R is matching paths, because traversal is linear and each returned path is copied.
- Space: O(h + Rh), for the explicit visit stack, active path, and returned path copies.

## Edge cases

An empty root produces no paths.
A single leaf is returned only when its value equals `targetSum`.
Negative values work because the remainder is not assumed to decrease toward zero.
Two identical valued branches produce two separate paths when both are valid.

## Common mistakes

- Accepting an internal node with the right sum violates the leaf requirement.
- Forgetting to pop during backtracking contaminates sibling paths.
- Appending the same mutable path object makes later backtracking erase saved answers.

## Language notes

Python uses `current_path.copy()` for each match.
Java uses `new ArrayList<>(currentPath)` and private `Visit` records implemented as a small class.
Python stores the same node, remainder, and leaving flag in tuples.
Both stacks use O(h) auxiliary storage and avoid recursive calls.
