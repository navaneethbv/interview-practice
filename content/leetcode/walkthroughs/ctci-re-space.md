## Intuition

At each sentence position, either leave the next character unrecognized or consume a dictionary word beginning there.
Once that choice is made, only the optimal answer for the remaining suffix matters.
A suffix dynamic program therefore minimizes unrecognized characters without enumerating every possible spacing.

## Brute force

Try every cut pattern between characters, score its recognized words, and choose the best.
There are exponentially many cut patterns, and they repeatedly solve identical sentence suffixes.

## Approach

Convert the dictionary to a set and record its longest word length.
Let `best[start]` be the minimum unrecognized characters from start onward, with `best[n] = 0`.
Process start indices backward.
Initialize each state to one plus the next state's cost, treating the first character as unrecognized.
For each dictionary-length-bounded ending position, test the substring and, when recognized, minimize with `best[end]`.
Return `best[0]`.
All referenced suffix states have already been computed because every end lies after start.

## Walkthrough

Example 1 contains `jesslookedjustliketimherbrother`.
The dictionary recognizes `looked`, `just`, `like`, `her`, and `brother` as zero-cost chunks.
The prefix `jess` contributes four unrecognized characters and the middle `tim` contributes three.
The dynamic program can connect those recognized chunks around both gaps, giving total cost seven.
No spacing can recognize those remaining characters using the supplied dictionary, so return 7.

## Complexity

Let n be sentence length, L the maximum dictionary word length, and C dictionary characters.
The references create and hash substrings, giving a conservative O(C + nL squared) time bound.
Stored dictionary strings and the suffix table use O(C + n) space, plus a temporary O(L) substring.

## Edge cases

An empty sentence costs zero.
An empty dictionary leaves every character unrecognized.
Several overlapping dictionary matches must all be considered.

## Common mistakes

Always taking the longest available word is not generally optimal for later suffixes.
Ignoring substring-copy cost understates the literal reference implementation's runtime.

## Language notes

Python uses string slices and Java uses substring calls before hash-set lookup.
Both return only the minimum count; they do not reconstruct the chosen spacing.
