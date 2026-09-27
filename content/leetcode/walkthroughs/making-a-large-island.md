## Intuition

Changing one zero can join only the islands touching its four edges.
If each original island has a unique label and a recorded area, evaluating a candidate zero needs only those neighboring labels.
A set prevents the same island from being counted twice when it touches the candidate from multiple sides.

## Brute force

Temporarily flip each zero and flood-fill the grid to find the largest island.
With n² candidates and O(n²) work per candidate, this costs O(n⁴) time.
Labeling each original island once reduces later candidate evaluation to constant-size neighborhood work.

## Approach

1. Flood-fill every unvisited island, replacing its ones with a unique label starting at 2.
2. Record its area in `sizes`, and reserve `sizes[0] = 0` for water.
3. Initialize `best` to the largest original island area.
4. For each remaining zero, collect the distinct labels on valid neighboring cells.
5. Add one for the flipped cell to the sum of those island areas, and update `best`.

The iterative flood fill marks cells when pushing them, so each land cell enters its stack only once.

## Walkthrough

Example 1 is `grid = [[1,0],[0,1]]`.
Row-major labeling assigns label 2 to `(0,0)` and label 3 to `(1,1)`.
The grid becomes `[[2,0],[0,3]]`, with `sizes[2] = sizes[3] = 1` and initial `best = 1`.
The zero at `(0,1)` touches both labels, so its candidate area is `1 + 1 + 1 = 3`.
The zero at `(1,0)` gives the same area.
The maximum is therefore 3.

## Complexity

- Time: O(n²), because labeling visits each cell a constant number of times and each zero has four neighbors.
- Space: O(n²), for the largest traversal stack and the island-size map; each candidate set has at most four labels.

## Edge cases

An all-land grid returns its full original area without flipping anything.
An all-water grid returns one.
Repeated neighboring labels contribute only once.
Boundary cells inspect only neighbors within the square grid.
Both references intentionally replace land values with labels in the supplied grid.

## Common mistakes

- Summing neighboring cells without deduplicating labels overcounts connected islands.
- Forgetting the candidate cell's own area makes every flipped result one too small.
- Starting labels at one makes visited land indistinguishable from unvisited land.

## Language notes

Python uses a neighbor generator, a list stack, and a dictionary of sizes.
Java uses `ArrayDeque`, direction offsets, `HashMap`, and `HashSet`.
Both avoid recursive flood fill, so a large connected island does not consume the language call stack.
