## Intuition
After sorting, pairing adjacent values maximizes the sum of pair minima.
A small value paired with a much larger value still contributes only the small value, so using the next smallest value as its partner protects the next possible minimum.
Taking every other sorted value therefore captures the best contribution from each pair.

## Brute force
Trying every pairing is factorial in the number of values.
Even a greedy choice of the largest available partner can waste medium values and reduce later minima.
Sorting exposes the exchange argument behind adjacent pairing.

## Approach
1. Sort `nums` in nondecreasing order.
2. Pair index 0 with 1, index 2 with 3, and so on.
3. Add the value at each even index, which is the smaller member of that adjacent pair.

## Walkthrough
Example 1 sorts `[1, 4, 3, 2]` into `[1, 2, 3, 4]`.
The adjacent pairs are `(1, 2)` and `(3, 4)`.
Their minima are 1 and 3, producing a sum of 4.
Pairing 1 with 4 would leave 2 and 3, whose minima sum to only 3.

## Complexity
Sorting dominates at O(N log N) time.
The sum scan is O(N), and the sorted array uses O(N) storage in Python or the in-place Java sort's implementation workspace.

## Edge cases
Negative values are handled by the same ordering rule.
Duplicate values contribute independently according to their positions.
The even-length constraint guarantees every sorted value belongs to a pair.

## Common mistakes
Summing the larger value from each pair reverses the objective.
Pairing values before sorting misses the exchange argument.
Using a set would discard duplicates that must remain separate entries.

## Language notes
Python's `sorted` returns a new list, leaving the input object unchanged.
Java's `Arrays.sort` orders the supplied array in place.
Both references use an integer accumulator, sufficient for the stated bounds.
