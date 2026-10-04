## Intuition

Each requested value is the distance to the nearest pixel of one target color.
For one target color, multi-source BFS starting from every pixel of that color gives all nearest distances at once.
Running it for red, green, and blue covers the three cyclic requests.

## Brute force

Checking every target pixel for every screen cell can be quadratic in the grid area.
Multi-source BFS visits each cell once per color and reuses the distance map for all cells requesting that color.

## Approach

1. Run `_distances` with every `R`, then every `G`, then every `B` cell as an initial queue source.
2. Expand four-directionally, assigning an unvisited neighbor one more than the current distance.
3. For a red pixel read its green distance, for green read its blue distance, and for blue read its red distance.
4. Build the integer result grid in the original row and column order.

## Walkthrough

Example 2 is `screen = ["RGB"]`.
The green BFS assigns distances 1, 0, and 1, so the red cell receives 1.
The blue BFS assigns 2, 1, and 0, so the green cell receives 1.
The red BFS assigns 0, 1, and 2, so the blue cell receives 2.
The result is `[[1, 1, 2]]`.

## Complexity

- Time: O(3RC), which is O(RC) because the number of colors is constant.
- Space: O(RC) for one distance grid and the queue, with three maps retained for the final lookup.

## Edge cases

The guarantee of all three colors ensures every BFS reaches every cell.
A one-cell-wide screen still uses ordinary four-direction checks.
Adjacent target colors produce distance one.
The source pixels themselves always receive distance zero in their own map.

## Common mistakes

- Starting BFS from the requesting color reverses the meaning of the answer.
- Running a separate search from each cell repeats work unnecessarily.
- Allowing diagonal neighbors changes taxicab distance.
- Reusing one distance map without retaining all three target maps loses earlier results.

## Language notes

Python stores target maps in a dictionary keyed by color.
Java keeps named `toRed`, `toGreen`, and `toBlue` arrays and uses `long` only where needed by coordinates.
Both references use a queue seeded with every source pixel before expansion.
