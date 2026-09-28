## Intuition
For a candidate stability bound, every chosen edge must have strength at least that bound after at most one allowed doubling.
Mandatory edges must be included first, then free strong edges, then upgradeable weaker edges connect remaining components.

## Brute force
Enumerating spanning trees and upgrade choices is exponential in the edge count.
Union-find feasibility plus binary search over the answer turns the optimization into repeated near-linear checks.

## Approach
1. Check a bound by rejecting weak or cyclic mandatory edges.
2. Join every optional edge already meeting the bound without spending upgrades.
3. Join optional edges whose doubled strength reaches the bound, counting each successful union as one upgrade.
4. Binary-search the largest feasible bound between zero and 200000.

## Walkthrough
Example 1 has edges strengths 4, 3, and 1, with two upgrades available.
At bound 6, the strength-4 edge can be doubled and the strength-3 edge can be doubled, connecting all three vertices at cost 6.
The strength-1 edge is unnecessary, so two upgrades suffice and the answer is 6.

## Complexity
Each feasibility check initializes N DSU entries and processes the E edges a constant number of times.
With union by size and path halving, one check is O(N + E alpha(N)), and binary search adds O(log W) checks for bound range W.
The parent and component-size arrays use O(N) space.

## Edge cases
A mandatory edge that is too weak makes the bound impossible immediately.
If mandatory edges form a cycle, no spanning tree can include them all.
When connectivity cannot be reached within k upgrades, return -1.

## Common mistakes
Counting every upgradeable edge instead of only successful unions overestimates cost.
Using an upgraded edge before free strong edges can waste the upgrade on a redundant cycle.
Returning the first feasible bound misses the maximum-stability objective.

## Language notes
Python and Java use union by size with path halving, so their stated DSU bound matches.
The binary search limit follows the local edge-strength constraints.
