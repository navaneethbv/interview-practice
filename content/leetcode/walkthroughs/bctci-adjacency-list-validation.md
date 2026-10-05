## Intuition

An undirected adjacency list is a collection of directed entries with a symmetry requirement.
Each valid entry `(a, b)` must have exactly one reverse entry `(b, a)`.
Bounds, self-loops, and duplicates can be rejected before checking symmetry.

## Brute force

For every neighbor, search its entire row for the reverse edge and search earlier entries for duplicates.
These repeated row scans can be quadratic in the number of stored entries.

## Approach

Let `n` be the number of rows and collect directed entries in `edges`.
For each `node` and `neighbor`, first reject a negative or out-of-range neighbor, then a self-loop, then a duplicate directed pair.
Insert only validated pairs.
After all rows are processed, require the reverse of every stored pair to be present.
Doing symmetry checks in a second pass ensures that a valid reverse entry appearing in a later row is already available.
This establishes both local validity and the global undirected condition.

## Walkthrough

Example 1 has `graph = [[1], [0]]` and `n = 2`.
Row 0 contributes `(0, 1)`, and row 1 contributes `(1, 0)`.
Both neighbors are in range and differ from their source nodes.
Neither insertion repeats an existing pair.
The second pass finds `(1, 0)` for the first pair and `(0, 1)` for the second, so the result is true.

## Complexity

For V rows and E adjacency entries, expected time is O(V + E), including empty rows.
The hash set stores O(E) entries.

## Edge cases

An empty graph and isolated vertices are valid.
A repeated neighbor is invalid even when the opposite row repeats its reverse too.

## Common mistakes

Symmetry alone does not rule out duplicates or self-loops.
Validate a neighbor before using it as an index.

## Language notes

Python stores integer tuples.
Java encodes `(node, neighbor)` as `(long) node * n + neighbor`, preventing multiplication overflow and preserving unique valid pairs.
