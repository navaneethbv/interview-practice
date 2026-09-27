## Intuition

Removing all current leaves from a tree peels away the outermost layer.
The last one or two vertices are the tree's centers, and rooting at a center minimizes the maximum distance.
This is equivalent to repeatedly trimming breadth-first layers from the outside inward.

## Brute force

Rooting the tree at every vertex and measuring its height takes O(n²) time on a long tree.
Leaf trimming computes all centers in linear time.

## Approach

1. Build adjacency lists and degree counts.
2. Enqueue every vertex with degree one.
3. Remove one complete leaf layer and decrement neighboring degrees.
4. Enqueue neighbors that become leaves.
5. Stop when at most two vertices remain and return the queue.

## Walkthrough

Example 1 has n = 4 and edges [[1,0],[1,2],[1,3]].
Vertices 0, 2, and 3 are leaves, so they form the first queue layer.
Removing them decrements vertex 1's degree to zero.
Only vertex 1 remains, making it the unique center and the answer.

## Complexity

- Time: O(n), because each vertex and edge is processed a constant number of times.
- Space: O(n), for adjacency lists, degree counts, and the queue.

## Edge cases

A one-vertex tree returns [0] before building leaves.
A two-vertex tree returns both endpoints.
A path with even length has two centers.
A star has one center after all leaves are removed.

## Common mistakes

- Removing leaves one at a time mixes layers and can discard a center.
- Returning the first leaf layer gives the tallest roots.
- Forgetting the n = 1 case creates an empty leaf queue.
- Recomputing heights from every candidate loses the linear bound.

## Language notes

Python stores neighbor sets and removes leaves from them.
Java stores adjacency lists and tracks degrees directly, so removed edges need no list mutation.
