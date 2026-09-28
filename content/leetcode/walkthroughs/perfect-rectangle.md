## Intuition
A perfect cover has exactly the four outer corners once, every interior corner an even number of times, and total small-rectangle area equal to the bounding rectangle.
Tracking corner parity catches gaps and overlaps locally while the area check catches mismatched coverage that can share the same parity.

## Brute force
One conceptual solution paints every unit cell of every rectangle and checks the final grid, but its time and space depend on coordinate magnitudes rather than the number of rectangles.
The corner and area checks avoid expanding coordinates.

## Approach
1. Add each rectangle's area to `area` and update the minimum and maximum x and y values.
2. Toggle its four corner keys in a set, removing a key when it appears again.
3. Compute the bounding rectangle area from the extrema.
4. Return true only when the areas match and the set contains exactly the four bounding corners.

## Walkthrough
Example 1 contains `[0,0,1,1]` and `[1,0,2,1]`.
Their areas are `1` and `1`, so the accumulated area is `2` and the bounding rectangle from `(0,0)` to `(2,1)` also has area `2`.
The shared point `(1,0)` and `(1,1)` are toggled twice and disappear, while `(0,0)`, `(0,1)`, `(2,0)`, and `(2,1)` remain.
The area and four-corner conditions both hold, so the result is true.

## Complexity
For N rectangles, corner toggling and extrema updates take O(N) expected time with a hash set.
The set stores O(N) possible corners and the scalar area uses O(1) additional space.
The Java and Python references both use coordinate keys rather than allocating a geometric grid.

## Edge cases
Two rectangles separated by a gap leave the bounding area larger than the accumulated area.
Overlapping rectangles may cancel corner parity but still fail the area equality check.
Rectangles touching along an edge correctly cancel the two shared endpoint keys.

## Common mistakes
Checking only the four bounding corners misses interior gaps.
Checking only area misses overlaps that compensate for uncovered regions.
Using a list of all corners without toggling duplicates makes shared boundaries look like errors.

## Language notes
Python stores corners as tuples of integer coordinates.
Java uses a string key made from each coordinate pair and a `HashSet` with a helper that toggles membership.
