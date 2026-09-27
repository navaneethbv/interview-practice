## Intuition

Process values from right to left so already processed values are exactly those after the current index.
Coordinate compression and a Fenwick tree turn each count query into logarithmic time.

## Brute force

Comparing each value with every later value takes O(n squared) time.
The same suffix comparisons repeat for neighboring indices.

## Approach

1. Sort distinct values and assign one-based ranks.
2. Query the Fenwick tree for ranks strictly below the current value.
3. Add the current rank to the tree.
4. Reverse the collected counts to restore input order.

## Walkthrough

Example 1:

For [4,1,3,1], scanning from the right sees 1 with count 0.
Value 3 then sees one smaller value and records 1.
Value 1 sees no smaller value, while 4 sees 3 smaller values.
Reversing gives [3,0,1,0].

## Complexity

Compression costs O(n log n) time and O(n) space.
Each Fenwick query and update costs O(log n), giving O(n log n) total time.
The tree, rank map, and result use O(n) space in both references.

## Edge cases

Equal values are not smaller and query rank minus one excludes them.
Negative values receive ordinary compressed ranks.
An empty input returns an empty result if supplied outside the usual constraints.

## Common mistakes

Query before updating the current value.
Use rank minus one for strict comparison.
Reverse the right-to-left results before returning.

## Language notes

Python uses a dictionary and list Fenwick tree.
Java clones and sorts a primitive array, then returns the fixed-size list view produced from its Integer result array.
