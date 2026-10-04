## Intuition

Merging two different groups reduces the number of groups by exactly one.
Merging elements already connected changes nothing.
A union-find structure can maintain that count alongside component size and the smallest value in each component.

## Approach

`add` creates a singleton parent entry, size one, and minimum equal to the new element, then increments `groups`.
A private root lookup follows parent pointers while shortening paths by pointing nodes toward their grandparents.
`union` locates both roots and returns immediately if they match.
Otherwise attach the smaller component to the larger, combine their sizes and minima, and decrement `groups` once.
The public `find` returns the stored minimum at the root, not necessarily the root's own value.
`size` counts all introduced elements; `num_groups` returns the maintained component counter.
Separating structural roots from public representatives permits efficient balancing while honoring the deterministic minimum convention.

## Walkthrough

Example 1 begins with size and group count zero.
Adding 4 creates one group represented publicly by 4.
Adding 2 creates a second group represented by 2.
Unioning 4 and 2 combines them, so `find(2)` returns 2 and the group count becomes one.
Repeating that union discovers matching roots and leaves the group count at one, while the total element count remains two.

## Complexity

With expected constant-time map access, find and union take O(alpha(n)) amortized time after path compression and union by size.
Add, size, and group-count queries are expected O(1).
All dictionaries or maps together require O(n) storage for n introduced elements.

## Edge cases

Negative element values work normally because elements are map keys, not array indices.
The contract guarantees each element is added once before any lookup or union uses it.

## Common mistakes

Never decrement the group counter for a redundant union.
Returning the balancing root directly can violate the smallest-element representative convention.

## Language notes

Python uses integer-keyed dictionaries and Java uses `HashMap<Integer, Integer>`.
Java's public group-count method is `numGroups`, while Python exposes `num_groups` through the operation-name mapping.
