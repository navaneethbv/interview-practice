## Intuition

A suffix beginning with `2` expands into two already describable suffixes: everything after it, followed by everything after the next instruction.
This gives a direct recurrence that can be evaluated backward through the program.

## Brute force

Recursively interpreting both passes without remembering suffix expansions repeats work for nested `2` instructions.
The reference stores each suffix result, but still pays the cost of copying strings when concatenating those results.

## Approach

Allocate `expansions` with two extra empty entries.
From right to left, an L or R prepends itself to `expansions[index + 1]`.
A `2` concatenates `expansions[index + 1]` with `expansions[index + 2]`.
Return the expansion at index zero.

## Walkthrough

For Example 1, `seq = "2LR"` first gives suffix R the expansion `R`.
The preceding L gives `LR`.
At the leading `2`, concatenate the full following expansion `LR` with the expansion after skipping L, namely `R`.
The result is `LRR`.

## Complexity

Let n be program length and L the final output length.
The actual string copies cost the sum of stored suffix expansion lengths, bounded by O(nL).
Stored suffix strings also require O(nL) worst case space, not merely O(n + L).

## Edge cases

A program without `2` returns its original moves but still constructs all suffix strings.
Consecutive `2` instructions are handled by the same recurrence.
The statement forbids a trailing `2`, so every repeat instruction has a following instruction to skip.

## Common mistakes

Skip one source instruction on the second pass, not one move from the already expanded output.
These differ when the skipped instruction is another `2`.
Do not claim linear time merely because the outer loop visits n indices.

## Language notes

Python and Java both use immutable string concatenation and retain every suffix expansion.
Java initializes the two terminal strings explicitly; Python fills the entire list with empty strings.
Neither implementation uses recursion, so nested instructions do not create call stack depth.
