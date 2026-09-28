## Intuition
The value range is only 0 through 100, so a frequency table can replace pairwise comparisons.
The prefix total before a value equals the number of entries strictly smaller than that value.
Replacing each frequency with that prefix total turns the table into direct answers while preserving the original order in a final lookup.

## Brute force
For each input value, scan every other entry and count smaller values.
That costs O(N squared) time.
The bounded value domain permits a linear counting pass followed by a fixed 101-entry sweep.

## Approach
1. Count occurrences of every value.
2. Sweep values from 0 upward, storing the number seen before the current value in `counts[value]`.
3. Add the current frequency to the running total.
4. Map each original value to its transformed table entry.

## Walkthrough
Example 1 is `[8, 1, 2, 2, 3]`.
The frequency table has one 1, two 2s, one 3, and one 8.
Before value 1, zero numbers are smaller, so its table entry is 0.
Before value 2, one number is smaller, so both 2 entries map to 1.
Before value 3, three numbers are smaller, and before 8, four are smaller.
Looking up the original order gives `[4, 0, 1, 1, 3]`.

## Complexity
Counting and restoring the answers take O(N + V) time, where V is the fixed value range of 101.
The table uses O(V) space and the result uses O(N) output space.

## Edge cases
Equal values receive equal counts because their frequency is added only after their table entry is assigned.
The minimum value gets zero.
All equal values produce an all-zero result.

## Common mistakes
Counting values less than or equal to the current one includes duplicates incorrectly.
Returning results in sorted order loses the original index order.
Using a table indexed without respecting the stated value bounds risks invalid access.

## Language notes
Python uses a list of 101 counts and a list comprehension for the final mapping.
Java reuses the same `int[]` as the prefix table and allocates a separate result array.
The fixed domain is the reason both implementations avoid a hash map.
