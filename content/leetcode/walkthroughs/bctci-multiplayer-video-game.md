## Intuition

Connect players who can shoot each other in the original layout.
Each connected component must leave at least one survivor, since no shot crosses components.
Conversely, a spanning tree lets living parents eliminate leaves from the outside inward, leaving one survivor per component.

## Brute force

Simulate every possible sequence of shots and minimize the final survivor count.
The branching is exponential and unnecessary once the component invariant is recognized.

## Approach

Use disjoint sets with `parent`, `sizes`, and a component counter `groups`.
Maintain one previously encountered player for each row in `rows` and each column in `columns`.
Union each new player with those existing representatives, decrementing groups only when two different components merge.
Then update the row and column representatives.
Although some union pairs cannot shoot directly because of intervening players, all players in a row are connected through consecutive original positions.
Thus these unions preserve exactly the components of the actual fixed visibility graph without sorting coordinates or constructing every visibility edge.

## Walkthrough

Example 1 has players `(0,0)`, `(0,2)`, `(0,4)`, and `(3,4)`.
The first three belong to one row component, and the fourth joins it through the shared second coordinate 4.
Starting from four groups, three successful unions leave one.
For a concrete legal order, `(0,2)` can eliminate `(0,0)`, then `(0,4)` eliminate `(0,2)`, then `(3,4)` eliminate `(0,4)`.
One player remains.

## Complexity

With union by size and path compression, disjoint-set work is O(n α(n)) amortized, alongside expected O(n) map work.
Parents, sizes, and coordinate maps use O(n) space.

## Edge cases

No players yield zero survivors.
Players sharing neither coordinate remain separate components and all survive.

## Common mistakes

Do not assume eliminated positions stop blocking shots.
The proof uses original visibility edges, and counting groups does not require inventing new edges after eliminations.

## Language notes

Python stores separate row and column dictionaries.
Java stores two maps in a list and uses a `join` helper that reports whether groups actually merged.
