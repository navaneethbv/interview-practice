## Intuition

Union-find stores each element in a tree whose root identifies its group.
The public representative is the smallest value in that group, so the root itself does not need to be the smallest value.
Keeping a separate minimum at every root lets union by size remain efficient while preserving the deterministic result.

## Brute force

Scanning every member of a group for each `find` or `union` can make a long sequence of operations quadratic.
The parent forest avoids repeated scans by sharing group structure between operations.

## Approach

1. `add` creates a self-parented node with size one and its own minimum.
2. `_root` follows parent links and shortens the path by pointing each visited node to its grandparent.
3. `union` attaches the smaller root below the larger root, combines sizes, and updates the minimum.
4. Decrease the group count only when two distinct roots are joined.
5. `find` returns the stored minimum for the located root.

## Walkthrough

Example 1 starts empty, so `size` and `num_groups` both return zero.
After adding 4, the only group has size one and `find(4)` returns 4.
Adding 2 creates a second singleton group, then `union(4, 2)` attaches one root and stores minimum 2.
The next `find(2)` therefore returns 2, `num_groups` is one, and a repeated union changes nothing.

## Complexity

- Time: Each operation is amortized O(alpha(n)), where alpha is the inverse Ackermann function.
- Space: O(n) for parent, size, minimum, and group metadata.

## Edge cases

An empty instance reports zero elements and zero groups.
Negative element values work because the minimum comparison is numeric.
Unioning two elements already in one group must not decrement `groups`.

## Common mistakes

- Returning the root value instead of the stored group minimum breaks deterministic representatives.
- Attaching by value instead of size can create tall trees.
- Forgetting path compression preserves correctness but loses the intended performance.
- Counting `union` calls instead of successful merges gives the wrong group count.

## Language notes

Python uses dictionaries because elements are arbitrary signed integers.
Java uses `HashMap<Integer, Integer>` for the same reason and exposes `numGroups` in camelCase.
Both references use halving compression and retain the minimum only at current roots.
