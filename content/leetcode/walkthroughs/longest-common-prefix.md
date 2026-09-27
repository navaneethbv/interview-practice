## Intuition

Every string in the input must begin with the answer, so start with the first word as a candidate `prefix`.
Each later `word` can only shorten that candidate.
When it starts with `prefix`, the candidate remains valid for all words seen so far.

## Brute force

Try all P prefix lengths and compare each candidate with all A words.
Character comparisons can take O(A * P²) time in the worst case.
Keeping only the current candidate avoids restarting the search for every length.

## Approach

1. Initialize `prefix` to the first string.
2. For each later `word`, shorten `prefix` from the end until `word.startswith(prefix)`.
3. Return the surviving candidate after all words have constrained it.

## Walkthrough

Example 1 uses `strs = ["flower", "flow", "flight"]`.

| word | candidate changes | resulting `prefix` |
| --- | --- | --- |
| `flower` | initial candidate | `flower` |
| `flow` | remove `er` | `flow` |
| `flight` | remove `w`, then `o` | `fl` |

The final common prefix is `fl`.

## Complexity

- Time: O(A + S + P²) in the worst case, where A is the number of words, S is their total character count, and P is the initial prefix length.
Successful checks scan input characters, while at most P shortened candidates require up to O(P) copying and comparison each.
- Space: O(P), because shortening creates candidate strings up to the initial prefix length.

## Edge cases

An empty string immediately shortens the candidate to empty.
If the first two words disagree at their first character, the result becomes empty.
One input word is returned unchanged.
Repeated words do not change the candidate.

## Common mistakes

- Comparing only the first two words can miss a mismatch in a later word.
- Rejecting an empty candidate is wrong: every word starts with the empty string, so the shortening loop stops safely.
- Sorting the input changes the method's unnecessary cost and can mutate caller-owned data.

## Language notes

Python's `startswith` returns a boolean, while slicing creates a shorter string.
Java uses `startsWith` and `substring`, which also creates a new candidate string on modern Java runtimes.
The method parameter remains `strs`, while the readable loop variable is `word`.
