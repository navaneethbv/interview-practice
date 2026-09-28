## Intuition

Let dp[j] be the minimum deletion cost for the processed prefix of s1 and the first j characters of s2.
Matching characters keep the diagonal cost, while a mismatch deletes one character from either string.

## Brute force

Trying every common subsequence and deletion choice is exponential.
Dynamic programming reuses each prefix pair.

## Approach

1. Initialize the first row as the ASCII cost of deleting s2 prefixes.
2. For each character of s1, update the row in place while saving the previous diagonal.
3. Keep the diagonal on a match.
4. On a mismatch, take the cheaper deletion from s1 or s2.

## Walkthrough

For Example 1, s1=`ab` and s2=`ac`.
The shared `a` keeps its diagonal cost, then the mismatch between b and c chooses deleting b plus c.
ASCII values 98 and 99 total 197.

## Complexity

For lengths m and n, time is O(mn) and the one-dimensional DP uses O(n) space.
Python stores integer ASCII sums in a list; Java uses an `int[]` because the local maximum cost fits the contract.

## Edge cases

Equal strings cost zero.
If no characters match, every character from both strings is deleted.
The in-place update must preserve the old diagonal before overwriting it.

## Common mistakes

Use ASCII values, not character counts.
Take the minimum of deleting from either string.
Initialize both empty-prefix deletion costs.

## Language notes

Python uses `ord`; Java uses `char` numeric values directly.
Both references retain only one DP row.
The previous diagonal variable is the only extra state needed to update the row from left to right.
Each dp entry therefore represents both deletion choices for the current prefix pair.
