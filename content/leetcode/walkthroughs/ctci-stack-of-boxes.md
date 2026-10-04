## Intuition

A box can support another only when all three dimensions are strictly larger.
In particular, supporting boxes have greater height, so sorting by height gives an order in which every possible smaller top box has already been considered.
This allows dynamic programming over the choice of base.

## Brute force

Enumerate every possible ordered subset and test whether consecutive boxes fit.
The number of arrangements grows factorially, while many arrangements reuse the same best stack above a particular base.

## Approach

Sort into `ordered` by height.
For each `base`, inspect earlier boxes and keep the largest `best_with_base` value among those satisfying `_fits_on`.
Add the base's own height to obtain its best total stack height.
Take the maximum over all bases, using zero when there are no boxes.
The recurrence is valid because any stack above the base has an immediately adjacent bottom box, and that box's optimal stack is already known.

## Walkthrough

Example 1 sorts the boxes by heights 1, 2, and 3.
The box `[3, 1, 5]` has best height 1 but cannot fit on either narrower later box.
The box `[1, 2, 3]` has best height 2.
It fits strictly inside `[2, 3, 4]`, so the latter base supports total height `3 + 2 = 5`.
Return 5.

## Complexity

For n boxes, sorting takes O(n log n) and the nested comparison loops take O(n squared).
Auxiliary space is O(n) for the sorted references and dynamic-programming values.

## Edge cases

No boxes produce height zero.
Equal dimensions cannot stack because comparisons are strict.
Boxes retain their supplied orientation; rotation is not part of this reference.

## Common mistakes

Comparing only width and depth misses the strict height requirement.
Selecting the tallest individual box greedily can miss a taller combined stack.

## Language notes

Python's `_fits_on` compares all paired dimensions with `all`.
Java performs three explicit comparisons and sorts a shallow copy of the box array, leaving the input ordering unchanged.
