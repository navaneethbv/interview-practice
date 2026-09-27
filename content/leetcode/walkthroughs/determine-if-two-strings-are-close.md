## Intuition

Position swaps allow arbitrary rearrangement without changing character frequencies.
Globally exchanging two existing characters swaps their frequency counts but cannot introduce a new character.
Therefore the words are transformable exactly when they use the same character set and the same multiset of frequencies.

## Brute force

Searching every sequence of permitted operations creates many repeated strings and a combinatorial state space.
Even enumerating positional permutations can require factorial work.
Comparing the two invariants eliminates the need to construct any particular transformation.

## Approach

1. Count occurrences of every character in each word.
2. Verify that a character appears in one word if and only if it appears in the other.
3. Sort the frequency counts and compare them as multisets.
4. Return true only if both comparisons match.

The conditions are necessary because each allowed operation preserves them.
They are also sufficient: exchanges of character names can assign each frequency to the desired existing character, after which position swaps arrange the letters correctly.
Matching frequency multisets also implies equal total word lengths.

## Walkthrough

Example 1 compares `word1 = "aab"` and `word2 = "abb"`.

| Property | First word | Second word |
| --- | --- | --- |
| character set | {a,b} | {a,b} |
| counts by character | a:2, b:1 | a:1, b:2 |
| sorted positive counts | [1,2] | [1,2] |

Both required comparisons succeed, so the answer is true.
Exchanging a and b in the first word gives `bba`; position swaps can then rearrange it into `abb`.
The exchange alone changes the counts correctly but need not put the letters in their final positions.

## Complexity

For word lengths n and m, counting takes O(n + m) time.
Sorting at most 26 frequency values is constant work under the lowercase-English constraint.
Thus total time is O(n + m), and auxiliary space is O(1) for the fixed-size alphabet's counts and sorted copies.

## Edge cases

Identical words satisfy both conditions.
Two different single-character words fail because an absent character cannot be introduced.
Equal lengths alone are insufficient.
Matching character sets can still fail when their frequency multisets differ.

## Common mistakes

- Comparing counts by character is too strict, because character names may be exchanged.
- Comparing only sorted frequencies permits introducing characters that were absent.
- Treating a global exchange as changing only one occurrence models the wrong operation.

## Language notes

Python uses Counter keys for the support set and sorts its positive values.
Java first compares zero versus nonzero entries in two 26-element arrays, then sorts the arrays.
Matching supports ensure the same number of zero entries, so Java's comparison including zeros is equivalent to Python's positive-count comparison.
