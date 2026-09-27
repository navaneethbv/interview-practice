## Intuition

Two-coloring is exactly a bipartite graph test: every edge must connect opposite colors.
Starting a traversal from every uncolored vertex handles disconnected components.

## Brute force

Trying every assignment of two groups takes `2^V` possibilities for `V` vertices.
The coloring traversal checks each edge once in each direction and detects contradictions directly.

## Approach

1. Keep `colors` with no entry for an unvisited vertex and values 0 or 1 for assigned groups.
2. Start a stack at every uncolored vertex and assign its first color.
3. For each edge, assign an uncolored neighbor the opposite color.
4. Return false if a neighbor already has the same color, otherwise continue until all components are checked.

## Walkthrough

For Example 1, vertices 0 through 3 form a four-cycle.
Start at 0 with color 0, then color 1 and 3 with color 1.
Their remaining neighbor 2 receives color 0, and the final edges connect opposite colors.
No contradiction appears, so the result is `true`.

## Complexity

The traversal takes `O(V + E)` time and visits every adjacency entry.
The color map or array and traversal stack use `O(V)` extra space.

## Edge cases

An isolated vertex can receive either color and is always valid.
Disconnected components each need an independent starting color, and a self-loop would immediately fail, though the statement excludes self-loops.

## Common mistakes

- Traversing only from vertex zero misses disconnected odd cycles.
- Checking only uncolored neighbors misses conflicts between already colored vertices.
- Assigning the same color to neighbors reverses the bipartite condition.

## Language notes

Python uses a dictionary and list stack, while Java uses an `int[]` with zero as uncolored and `Deque<Integer>` for traversal.
Both versions are iterative, avoiding recursion depth concerns even though the local graph has at most 100 vertices.
