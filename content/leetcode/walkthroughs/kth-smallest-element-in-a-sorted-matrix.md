## Intuition

The matrix is sorted across rows and down columns, but the answer is the kth value in the flattened ordering.
For a candidate value, count how many matrix entries are at most that value.
That count is monotonic, so binary search over the numeric value range finds the smallest value whose count reaches k.

## Brute force

Flattening all matrix cells and sorting them takes O(n² log(n²)) time and O(n²) extra space for an n by n matrix.
A heap can reduce some work but still stores a frontier and does not use the matrix's full monotonic structure.
The counting search keeps only scalar bounds and a column pointer.

## Approach

1. Set left to the smallest matrix value and right to the largest.
2. Choose middle between those bounds.
3. For each row, move a shared column pointer left while values exceed middle.
4. Add column plus one to count the entries no larger than middle.
5. Move left upward when count is below k, otherwise move right to middle.
6. Return the converged bound.

## Walkthrough

Example 1 uses matrix = [[1, 3], [2, 4]] and k = 3.

| bounds | middle | count at most middle | decision |
| --- | ---: | ---: | --- |
| [1,4] | 2 | 2 | move left to 3 |
| [3,4] | 3 | 3 | move right to 3 |

The answer is 3 because exactly three entries are at most 3.

## Complexity

Let n be the matrix dimension and V be the numeric value range.
Each count scan moves the column pointer at most n positions and visits n rows, so one scan is O(n), making total time O(n log V).
The algorithm uses O(1) auxiliary space beyond the matrix and returned scalar.
The Java bound variables are long so midpoint arithmetic is safe for signed integer values.

## Edge cases

A one-cell matrix returns its only value.
Duplicate values are counted separately because each cell is an entry.
Negative values work because the search compares numeric bounds rather than indexes.
The first and last matrix entries provide valid initial bounds under the sorted contract.

## Common mistakes

- Resetting the column to n minus one for every row loses the monotonic scan benefit.
- Searching indexes instead of values does not handle gaps or duplicates correctly.
- Returning middle before the bounds converge can select a value with too few entries.
- Using an overflowing integer midpoint can move the search incorrectly.

## Language notes

Python uses integer bounds and a shared column pointer that only moves left during a count.
Java uses long bounds and a helper that returns the count for a long candidate.
Neither implementation copies the matrix or allocates a heap.
