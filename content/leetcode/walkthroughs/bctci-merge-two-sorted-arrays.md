## Intuition

The smallest unconsumed element of a sorted array is always its current first remaining element.
Therefore the smallest element across two remaining suffixes must be one of their two heads.
Repeatedly select the smaller head and advance only that array's pointer.

## Brute force

Concatenate the arrays and sort the combined values.
That ignores the ordering already present and generally costs O((n + m) log(n + m)) time.

## Approach

Let `i` and `j` index the next unconsumed values in `arr1` and `arr2`.
While neither input is exhausted, append the smaller value to `merged` and increment its pointer.
When values are equal, the references take from the first array first.
This is safe because the other equal value remains available for a later iteration.
Once one array ends, copy the entire remaining suffix of the other, which is already sorted and no smaller than the preceding output.
Every input occurrence is copied exactly once, including duplicates.

## Walkthrough

Example 1 compares 1 against 2 and selects 1, then selects 2 against 3.
It next selects 3, followed by the 4 from the first array.
The two 4s in the second array are still present, so both are copied before the remaining 5.
The result is `[1, 2, 3, 4, 4, 4, 5]`.
The three copies of 4 demonstrate that merging preserves multiplicity rather than forming a set union.

## Complexity

Both references take O(n + m) time and O(n + m) space for the returned array.
Java uses O(1) auxiliary space beyond that output.
Python's suffix slices can temporarily allocate O(n + m) additional storage in the worst case.

## Edge cases

If either input is empty, copy the other unchanged.
Negative values need no special treatment because ordinary comparisons already order them correctly.

## Common mistakes

Do not advance both pointers on equality, which would lose a duplicate.
Remember the unconsumed suffix after the main loop.

## Language notes

Python appends dynamically and uses `extend` for suffixes.
Java allocates the exact output length and uses a third index `k` for the next write.
