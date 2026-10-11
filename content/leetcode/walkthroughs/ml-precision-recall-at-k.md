## Intuition

Both metrics count the same thing, the relevant items in the top k, but divide by different totals: precision asks how much of what we showed was useful, recall asks how much of what was useful we showed.

## Approach

1. Put the relevant ids in a set.
2. Count how many of the first k ranked ids are in it.
3. Return `[hits / k, hits / |relevant|]`.

## Walkthrough

In Example 1 the top three are 7, 3 and 9. Only 3 is relevant, so precision is 1/3. One of the three relevant items (3, 4, 8) was retrieved, so recall is also 1/3.

## Complexity

- Time: O(k + |relevant|).
- Space: O(|relevant|).

## Edge cases

- Relevant items outside the ranked list still count in recall's denominator.
- k equal to the list length gives overall precision.

## Common mistakes

- Dividing precision by the number of hits or by the list length.
- Integer division.
