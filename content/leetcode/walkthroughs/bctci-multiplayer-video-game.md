## Intuition

Connect original player positions that can exchange a shot before any elimination.
A connected component can be reduced to one survivor, but separate components can never interact.
The answer is therefore the number of connected components in the original visibility graph.

## Brute force

Explore possible shot sequences and keep the smallest terminal survivor count.
This has a huge branching factor and treats many equivalent elimination orders separately.

## Approach

Use union-find over player indices and begin with one group per player.
Maintain maps from each row and column coordinate to a previously seen player on that line.
Join the new player to those representatives, decrementing `groups` only for successful merges.
Although the map connection need not represent a direct unobstructed shot, all original positions on a common row or column form a connected chain of neighboring positions.
Joining them through any representative preserves precisely that connectivity.
Within a component, take a spanning tree and eliminate leaves using their still-living parents, continuing inward until one player remains.
Original blockers do not invalidate those tree edges because each is an original direct visibility edge.

## Walkthrough

Example 1 has three players on coordinate x equal to zero and one at `(3, 4)`.
The first three positions connect along their shared column, even though the middle player blocks a direct shot between the endpoints.
The player at `(3, 4)` connects to `(0, 4)` through their shared row.
All four belong to one component, and leaf eliminations can leave one survivor.
The result is 1.

## Complexity

With expected constant-time map operations, n players require O(n alpha(n)) amortized time for union-find work.
The maps and parent/size arrays use O(n) space in both references.

## Edge cases

Empty input returns zero.
Players sharing no row or column each remain their own component and must all survive.

## Common mistakes

Eliminated positions remain blockers; do not simulate new lines of sight through them.
Only successful unions reduce the component count.

## Language notes

Python keeps separate row and column dictionaries.
Java stores the two coordinate maps in a list and uses path halving with union by size.
