## Intuition

An undirected adjacency list must satisfy local entry rules and a global symmetry rule.
Store directed adjacency entries so both types of checks can be performed without repeatedly searching neighbor lists.

## Brute force

Searching a neighbor's entire list for each reverse edge can become expensive on dense graphs.
Converting directly to sets without checking insertions would also hide duplicate entries that must be rejected.

## Approach

Scan each `(node, neighbor)` entry.
Reject an out-of-range neighbor, a self-loop, or an entry already present in `edges`.
Otherwise insert that directed edge.
After all local checks pass, verify that every stored `(a, b)` has the reverse `(b, a)`.
This two-stage process is sufficient: all endpoints are valid, all entries are unique and loop-free, and symmetry holds for every edge.
An adjacency list is allowed to describe disconnected components or isolated vertices.
There is no additional connectivity requirement.

## Walkthrough

```text
Input: graph = [[1], [0]]
Output: true
```

Example 1 first inserts directed entry `(0, 1)` and then `(1, 0)`.
Both neighbors are in range, neither edge is a self-loop, and neither repeats an earlier entry.
The final symmetry check finds `(1, 0)` for the first edge and `(0, 1)` for the second.
Every required condition holds, so the result is true.

## Complexity

For V vertices and E listed neighbor entries, expected time is O(V + E).
The edge set uses O(E) extra space.
Hash-table complexity assumes normal constant-time membership behavior.

## Edge cases

The empty graph is valid.
A graph with only isolated vertices is valid.
One missing reverse entry is enough to make the result false.

## Common mistakes

Do not accept a self-loop just because it is its own reverse.
Checking symmetry alone misses duplicate neighbors.

## Language notes

Python stores tuple keys.
Java encodes `(a, b)` as the long integer `a * V + b` after validating indices, so different valid edges have distinct keys.
