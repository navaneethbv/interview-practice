## Intuition

Instead of asking where each cell can drain, reverse the question and ask which cells each ocean can reach uphill.
A reverse move to an equal or higher neighbor corresponds to a valid downhill move toward the ocean in the original direction.
Cells reached by both ocean searches are exactly the required intersection.

## Brute force

Launch a downhill search from every cell and check whether it reaches both oceans.
For R rows and C columns, this can take O((RC)²) time because many searches revisit the same terrain.
Two shared reverse traversals avoid that repetition.

## Approach

1. Use multi-source BFS starting from the Pacific's top and left boundaries.
2. Record each discovered cell in that traversal's `seen` state and move only to equal or greater heights.
3. Repeat from the Atlantic's bottom and right boundaries with independent visited state.
4. Scan cells in row-major order and append coordinates present in both `pacific` and `atlantic`.

Marking cells when queued ensures that repeated boundary corners and alternative paths do not enqueue the same cell repeatedly.
The searches do not modify `heights`.

## Walkthrough

Example 1 has `heights = [[1, 2], [4, 3]]`.

| Search | Boundary starting cells | Additional reverse-reachable cells |
| --- | --- | --- |
| Pacific | `(0,0)`, `(0,1)`, `(1,0)` | `(1,1)` at height 3, reached from height 2 |
| Atlantic | `(1,0)`, `(1,1)`, `(0,1)` | None |

The Atlantic search cannot climb backward from heights 2 or 4 into height 1.
Intersecting the reached sets gives `[[0, 1], [1, 0], [1, 1]]`.
These cells each have a forward downhill path to both boundary systems.

## Complexity

- Time: O(RC), since each search visits each cell at most once and the final intersection scan is linear.
- Space: O(RC), for two visited structures, queues, and the possible output.

## Edge cases

A single cell touches both oceans and is returned.
Equal-height neighbors remain traversable, allowing flat plateaus to connect to boundaries.
A single row or column lies on both relevant boundary systems.

## Common mistakes

- Traversing downhill from the oceans reverses the intended reachability relation incorrectly.
- Sharing one visited structure between oceans loses which boundary each cell reaches.
- Requiring strictly greater heights rejects valid equal-height flow.

## Language notes

Python uses coordinate sets and `collections.deque`; Java uses boolean matrices and `ArrayDeque<int[]>`.
Both construct the output with a row-major scan, avoiding a final coordinate sort.
Java's `addCell` helper centralizes visited checks for both boundary initialization and neighbor discovery.
