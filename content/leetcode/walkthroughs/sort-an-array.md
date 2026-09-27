## Intuition

Bottom-up merge sort combines sorted runs whose widths double each round.
Merging two ordered runs is linear and does not require recursion depth.

## Brute force

Repeatedly selecting the smallest remaining value is O(n squared).
It wastes work searching the same unsorted suffixes.

## Approach

1. Start with runs of width one.
2. Merge neighboring runs into a temporary array.
3. Swap the source and temporary arrays.
4. Double the width until one run covers the input.

## Walkthrough

Example 1:

For [5,2,3,1], width one merges pairs into [2,5,1,3].
Width two merges those runs into [1,2,3,5].
The method returns the sorted array.
The merge comparison keeps equal values in their original relative order during each merge.

## Complexity

There are O(log n) rounds and each round touches n values, so time is O(n log n).
The temporary buffer uses O(n) auxiliary space in both references.
Python keeps two list objects during swapping, and Java keeps two primitive arrays.

## Edge cases

An empty or one-element array needs no merge rounds.
Duplicate values remain adjacent after merging.
The final source array may be the temporary array after an odd number of rounds, so return the current source.

## Common mistakes

Do not read beyond a run when its neighbor is empty.
Do not forget to swap buffers after every completed width.
Use a stable less-than-or-equal choice when values tie.

## Language notes

The Python method mutates the list reference locally and returns whichever list holds the final run.
Java returns the corresponding current primitive array.
