## Intuition

The fewest deletions needed to make a string a palindrome can be computed from its longest palindromic subsequence.
The reference instead stores the minimum deletions for every substring while expanding substring lengths through a one-dimensional dynamic program.
Matching endpoints inherit the inner substring cost, while mismatching endpoints require deleting one side.

## Brute force

Trying both deletion choices at every mismatch creates exponentially many subsequences.
Memoizing intervals reduces repeated work to O(n²) states, but a full two-dimensional table uses O(n²) space.
The rolling array preserves the same transitions with O(n) space.

## Approach

1. Initialize dp[right] to zero for one-character substrings.
2. Process left indexes from right to left.
3. Save the old dp[right] value before overwriting it.
4. For matching endpoints, assign the previous diagonal value.
5. For mismatching endpoints, add one to the smaller deletion cost from either side.
6. Return whether dp[-1] is at most k.

## Walkthrough

Example 1 uses s = "abcdeca" and k = 2.

| Completed left index | Suffix ending at the final a | `dp[6]` after this row |
| ---: | --- | ---: |
| initial | `a` | 0 |
| 5 | `ca` | 1 |
| 4 | `eca` | 2 |
| 3 | `deca` | 3 |
| 2 | `cdeca` | 2 |
| 1 | `bcdeca` | 3 |
| 0 | `abcdeca` | 2 |

Before updating a cell, `old = dp[right]` is the deletion cost for `[left + 1,right]`.
The already-updated `dp[right - 1]` describes `[left,right - 1]`, and `diagonal` preserves `[left + 1,right - 1]`.
Saving `old` into `diagonal` after the update preserves the next column's inner-substring cost.

Keeping a,c,d,c,a after deleting b and e produces the palindrome "acdca".

## Complexity

Let n be the string length.
The nested left and right loops evaluate O(n²) substring states with constant work, so time is O(n²).
The rolling dp array uses O(n) auxiliary space.
No substring copies are created.

## Edge cases

A palindrome already has deletion cost zero.
A string of length one is always valid.
When k is at least the string length, the result is true.
A mismatch can be resolved by deleting either endpoint, so both transitions are necessary.

## Common mistakes

- Using the current dp[right] after overwriting it loses the previous diagonal state.
- Taking the larger mismatch cost can reject a valid palindrome.
- Comparing only adjacent characters misses long-range endpoint mismatches.
- Building every subsequence wastes the rolling dynamic program's space benefit.

## Language notes

Python stores the current row in a list and keeps old diagonal in a scalar.
Java mirrors that array and uses charAt for endpoint comparisons.
Both avoid recursion and therefore handle strings near the length limit safely.
