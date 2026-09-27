## Intuition

Compare prefixes of word1 and word2, and ask for the cheapest way to finish their transformation.
If the final characters match, no new edit is needed.
Otherwise the final operation is an insertion, deletion, or replacement, so the best answer is one plus the smallest neighboring state.

## Brute force

Trying every possible edit recursively creates many repeated prefix pairs.
Memoization avoids duplicate calls but still describes a two-dimensional state space.
Bottom-up dynamic programming computes those states in a predictable order.

## Approach

1. Set previous_row[j] = j, the cost of changing an empty first word into the first j characters.
2. Build one current_row for each character of word1.
3. Set its first entry to the number of deletions needed for an empty second prefix.
4. Copy the diagonal state when characters match.
5. Otherwise take one plus the minimum insertion, deletion, and replacement state.
6. Return the final entry.

Only the previous row is needed, so complete rows do not need to remain in memory.

## Walkthrough

Example 1 transforms word1 = "cat" into word2 = "cut".

| Processed first prefix | current_row |
| --- | --- |
| empty | [0, 1, 2, 3] |
| c | [1, 0, 1, 2] |
| ca | [2, 1, 1, 2] |
| cat | [3, 2, 2, 1] |

The final 1 means replacing a with u is sufficient.

## Complexity

- Time: O(len(word1) × len(word2)), because each prefix pair is visited once.
- Space: O(len(word2)), for two rows of dynamic programming.

## Edge cases

Two empty words require zero edits.
An empty word paired with a nonempty word requires its length in insertions or deletions.
Equal words copy diagonal values throughout.
Repeated characters are handled by the same prefix recurrence.

## Common mistakes

- Using only diagonal matches and forgetting the three edit choices.
- Initializing the first row or column to zero.
- Returning the last row's wrong column when word lengths differ.
- Keeping a full table when only two rows are needed.

## Language notes

Python stores rows as lists and Java stores them as integer arrays.
Both names, insert_cost, delete_cost, and replace_cost, describe the same recurrence.
The Java implementation uses Math.min with nested calls because there is no built-in three-way minimum.
