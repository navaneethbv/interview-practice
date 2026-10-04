## Intuition

The meaning of an instruction depends on the suffix that follows it.
Compute suffix expansions from right to left so every needed continuation is already available.
A doubling instruction combines two different suffixes, because its second pass skips one original instruction.

## Brute force

Interpret both passes recursively whenever a 2 appears.
Repeated suffixes would be expanded again and again, and careless skipping of an expanded move would change the program's meaning.

## Approach

Let `expansions[index]` hold the complete move string produced by the suffix beginning at that original index.
Add two empty sentinel entries after the program.
For L or R, concatenate that move with the following suffix expansion.
For 2, concatenate `expansions[index + 1]` with `expansions[index + 2]`.
The second term skips exactly the next original instruction, whether that instruction is a move or another 2.
Fill indices backward and return the expansion at zero.
This recurrence follows the instruction definition directly and avoids recursive control flow.
It still stores complete expanded strings for all suffixes, so it is not a compact representation of the final program.

## Walkthrough

Example 1 uses `2LR`.
The suffix at index two expands to R.
The suffix at index one expands to L followed by R, giving LR.
At index zero, the 2 concatenates the expansion LR with the expansion R that skips the following original L.
The final move sequence is LRR.

## Complexity

Let n be instruction count and S the sum of all stored suffix-expansion lengths.
Both references take O(n + S) time and space because immutable-string concatenation copies those expansions.
With final output length L, O(n times L + n) is a useful upper bound.
Even a program without doubling can have quadratic total suffix storage.

## Edge cases

One move returns itself.
Consecutive 2 instructions must skip an original instruction during the second pass, not merely remove the first resulting move.

## Common mistakes

Do not claim linear complexity just because the outer loop is linear.
The no-trailing-2 contract ensures each doubling has an instruction to skip.

## Language notes

Python stores suffix strings in a list; Java stores them in a `String[]`.
Both allocate new immutable strings when concatenating.
