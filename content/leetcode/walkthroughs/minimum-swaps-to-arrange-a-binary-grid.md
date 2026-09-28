## Intuition
Row i must end with at least `n - i - 1` trailing zeros, so the rows can be selected greedily from top to bottom.
Moving the first qualifying row upward is optimal because every row it passes costs one adjacent swap.

## Brute force
Trying every row order is factorial in n.
Counting trailing zeros and greedily selecting the first feasible row uses the required ordering without exploring permutations.

## Approach
1. Count trailing zeros in every row.
2. For each target row, scan downward for the first row with enough trailing zeros.
3. Add its distance as the swap cost and remove it from its old position by shifting the intervening counts down.
4. Return -1 if no qualifying row remains.

## Walkthrough
Example 1 has trailing-zero counts `[0,1,2]` for the three rows.
The first row needs two zeros, so move the third row upward by two swaps and counts become `[2,0,1]`.
The second row needs one zero, so move the last row up by one swap and counts become `[2,1,0]`.
The final row needs none, giving total `2 + 1 = 3`.

## Complexity
Counting zeros takes O(n^2) time in the matrix representation.
The greedy search and list shifts take O(n^2) additional time in the worst case.
Python list insertion and removal use O(n) movement, while Java shifts an O(n) array; both use O(n) auxiliary count space.

## Edge cases
An already suitable diagonal returns zero swaps.
If no row has enough trailing zeros for a position, the arrangement is impossible.
Rows with identical zero counts are interchangeable for the greedy choice.

## Common mistakes
Counting leading zeros instead of trailing zeros checks the wrong diagonal condition.
Choosing any feasible row rather than the first can add unnecessary swaps.
Forgetting to shift the selected row changes later positions.

## Language notes
Python uses `pop` and `insert` on the count list.
Java performs the equivalent shift manually without modifying the grid itself.
