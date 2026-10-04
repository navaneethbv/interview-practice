## Intuition

Distances to the nearest red, green, and blue pixel are three separate nearest-source problems.
A breadth-first search beginning at every pixel of one color computes that color's distance field.
After building all three fields, each pixel selects the field for its required next color.

## Brute force

For each pixel, scan every pixel of its target color and minimize Manhattan distance.
A grid with N cells can then require O(N squared) comparisons.

## Approach

For one target color, initialize all distances to -1 and enqueue every pixel of that color at distance zero.
Expand in four orthogonal directions, assigning each unvisited neighbor the current distance plus one.
The grid has no obstacles, so shortest four-direction path distance equals taxicab distance.
Repeat for R, G, and B.
Construct the result by selecting distance to green for red pixels, distance to blue for green pixels, and distance to red for blue pixels.
A pixel's own color field is not its answer field.

## Walkthrough

In Example 1, the red pixel at `(0, 0)` is two steps from green at `(1, 1)`, so its result is 2.
The green pixel at `(0, 3)` is two steps from blue at `(0, 5)`, so its result is also 2.
That blue pixel is one step from red at `(0, 4)`, producing 1.
The same three computed fields supply every other displayed cell without independent nearest-color searches.

## Complexity

Each breadth-first search visits every cell once, and there are exactly three colors.
For r rows and c columns, both references take O(r times c) time.
The three distance grids, output, and queue require O(r times c) space overall, with a larger constant than a single search.

## Edge cases

The contract guarantees at least one source of every color.
Single-row or single-column grids still use the same orthogonal traversal.

## Common mistakes

Do not treat other colors as walls.
The target mapping is directional: red seeks green, green seeks blue, and blue seeks red.

## Language notes

Python stores the fields in a color-keyed dictionary.
Java keeps three named arrays and uses a conditional expression to select the appropriate field.
