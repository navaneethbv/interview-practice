## Intuition

Stones are connected when they share a row or column.
Within each connected component, all but one stone can be removed.

## Brute force

Repeatedly searching for a removable stone can rescan every remaining stone.
That can take O(n squared) time.

## Approach

1. Represent each row and column as disjoint-set nodes.
2. Union the row node and column node for every stone.
3. Count connected components among those nodes.
4. Return stones minus components.

## Walkthrough

Example 1:

For stones [0,0], [0,1], and [1,1], the first two share row 0 and the last two share column 1.
All three belong to one component.
One stone must remain, so two can be removed.

## Complexity

With n stones, union-find takes O(n alpha n) expected amortized time.
The parent map uses O(n) space for encountered rows and columns.
Python tuple keys and Java encoded integer keys both represent the two node types.

## Edge cases

Stones with no shared row or column form separate components and yield zero removals.
When all stones share one row, every stone except one can be removed.
Path compression keeps repeated root queries small.

## Common mistakes

Do not count rows and columns as stone components directly.
Subtract the number of connected components from the number of stones.
Keep row and column node identities disjoint.

## Language notes

Python uses tagged tuple keys with recursive path compression and union by size.
Java uses bitwise complement to encode column keys separately from nonnegative row keys.
Every union represents one stone's shared row and column relationship.
