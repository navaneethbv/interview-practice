## Intuition

Place taller people first, so inserting a person at index k automatically leaves exactly k people at least as tall before them.
For equal heights, lower k comes first so later insertions count correctly.

## Brute force

Trying every permutation and checking k is factorial.
Sorting plus indexed insertion fixes each person's position greedily.

## Approach

1. Sort by descending height and ascending k.
2. Insert each record at its k index in the result list.
3. Return the completed queue.

## Walkthrough

For Example 1, `[7,0]` and `[7,1]` are processed before shorter people.
Then `[5,0]` is inserted at the front, `[6,1]` at index 1, and the remaining records fill their requested positions.
The final queue matches all k counts and the listed output.

## Complexity

Sorting n records costs O(n log n), while list insertion can shift O(n) entries per person, giving O(n²) worst-case time.
Python's result list and sorted copy use O(n) space; Java mutates the sorted input and uses an O(n) `ArrayList`.

## Edge cases

A single record with k=0 stays in place.
Equal heights are ordered by k.
The valid-input guarantee ensures each insertion index is legal.

## Common mistakes

Sort heights descending.
Insert at k rather than append.
Use ascending k for equal heights.

## Language notes

Python's `list.insert` and Java's `ArrayList.add(index, value)` have the same shifting behavior.
Taller records are already fixed when a shorter record is inserted, so they provide the people counted by k.
Taller records are already fixed when a shorter record is inserted, so they provide the people counted by k.
