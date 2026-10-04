## Intuition

First determine the final connected components, then aggregate edge gains inside those components.
A component's mean must divide its total gain by its edge count, rather than by its number of vertices.

## Brute force

Rescanning all edges for each discovered component can repeat substantial work.
Grouping endpoints with disjoint sets allows a single aggregation pass after connectivity is complete.

## Approach

Initialize a parent array and join the endpoints of every edge.
Then scan the original edges again, find one endpoint's final root, and add the edge's gain and one count to that root's totals.
Compute total divided by count for every component containing edges and take the maximum.
Isolated vertices have average zero, already covered by the default answer.
All unions occur before aggregation so later root changes cannot strand partial totals under obsolete representatives.

## Walkthrough

```text
Input: V = 4, edges = [[0, 1, 3], [1, 2, 2], [2, 3, 1], [3, 0, 2]]
Output: 2.0
```

Example 1 connects all four vertices into one component.
Its four listed edge gains are 3, 2, 1, and 2.
The aggregation produces total gain 8 and edge count 4 for that component's root.
Its average is 8 divided by 4 = 2.0, which is the returned maximum.

## Complexity

Storage is O(V) for parents and per-component aggregates.
The reference uses path compression without union by size or rank.
A conservative time bound is O(V + EV), with actual root walks shortened by compression; the usual combined-heuristic alpha bound is not assumed here.

## Edge cases

A graph with no edges returns 0.0.
Zero-gain edges still count in the denominator.
Several components must be compared separately rather than averaging the whole graph.

## Common mistakes

Count each input edge once, not once per endpoint.
Do not aggregate under roots before all unions finish.

## Language notes

Python stores sparse totals in dictionaries and uses true division.
Java uses long totals and counts, converting to double before division to retain the fractional mean.
