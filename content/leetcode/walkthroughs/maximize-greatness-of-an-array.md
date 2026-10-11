## Intuition

Order does not matter, only which values are paired. To beat as many values as possible, use the smallest available value that is strictly larger for each of the smallest values first, the same greedy as matching sorted sequences.

## Approach

1. Sort the values.
2. Keep a pointer to the smallest value not yet beaten.
3. For each value in sorted order, if it is larger than the value at the pointer, pair them and advance the pointer.
4. The pointer is the answer.

## Walkthrough

Sorted, Example 1 is 1 1 1 2 3 3 5. The values 2, 3, 3 and 5 beat the three 1s and the 2, so the greatness is 4.

## Complexity

- Time: O(n log n).
- Space: O(1) beyond sorting.

## Edge cases

- Equal values never beat each other.
- All values equal gives 0.

## Common mistakes

- Counting `>=` as a win.
- Pairing the largest values first, which wastes them on small values.
