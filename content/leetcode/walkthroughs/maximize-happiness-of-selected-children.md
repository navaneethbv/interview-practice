## Intuition

Selecting a child earlier avoids one more point of happiness loss for every child selected later.
Therefore, choose children in descending initial happiness order, and subtract the selection index from each chosen value.

## Brute force

Trying every set and selection order is exponential in the number of children.
A greedy ordering captures both the best available value and the time-dependent decrease.

## Approach

1. Sort happiness values in descending order.
2. For selection index i, add `max(0, happiness[i] - i)`.
3. Stop after k selections and return the long total.

## Walkthrough

This is Example 1 from the local statement.
Sorting `[1,2,3]` gives `[3,2,1]`.
The first selection contributes 3 with no prior decrease.
The second selected child has current happiness `2 - 1 = 1`, so the total is 4.
Selecting the child with initial happiness 1 would contribute zero and cannot improve the answer.

## Complexity

Sorting n values costs O(n log n), and summing k choices costs O(k).
Python's sorted copy uses O(n) list storage and its selected slice adds O(k), while Java's in-place array sort uses implementation-dependent stack space.

## Edge cases

If happiness falls below the selection index, its contribution is clamped to zero.
Selecting all children still follows the same descending order.
All values are positive initially, but later contributions may be zero.

## Common mistakes

Do not subtract the number of already selected children from every value before sorting.
Sort descending so large values receive the smallest decreases.
Use a wide total because many selected values can exceed `int`.

## Language notes

Python sorts a copied prefix, while Java sorts the input array and reads from its end.
Java returns `long`, matching the specification's potentially large sum.
