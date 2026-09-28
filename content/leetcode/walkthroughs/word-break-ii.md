## Intuition
A sentence starting at a given index depends only on the suffix beginning there.
Memoizing every suffix's possible sentences prevents recomputing the same completions after different prefixes.
The recursion builds complete sentences by prepending each dictionary word that matches the current position.

## Brute force
Trying every cut position recursively without memoization repeats the same suffix work exponentially.
For strings with many repeated letters, the same suffix can be reached through many prefix choices.
Memoization keeps one result list per start index, although the output itself may still be large.

## Approach
1. Convert `wordDict` to a set for membership checks.
2. Define `sentences(start)` as all valid sentences covering `s[start:]`.
3. Return a list containing the empty suffix at the end of the string.
4. For every end position, continue only when `s[start:end]` is a dictionary word.
5. Append that word to each memoized suffix sentence with a separating space when needed.

## Walkthrough
Example 1 is `"catsanddog"` with words `cat`, `cats`, `and`, `sand`, and `dog`.
At start 0, `cat` leads to the suffix `sanddog`, which produces `sand dog`, yielding `cat sand dog`.
The word `cats` leads to `anddog`, which produces `and dog`, yielding `cats and dog`.
Both complete sentences are stored for start 0 and returned in any order.

## Complexity
Let K be the total character length of all sentence strings retained in the memoized lists and returned output.
There are O(N squared) candidate substrings across all suffix states, and copying each substring can make the membership work O(N cubed).
The total time is O(N cubed + K), while memoized sentence storage uses O(N squared + K) space in addition to O(N) suffix keys.

## Edge cases
An uncovered character leaves the relevant suffix with an empty result list.
A dictionary word may be reused because membership is checked independently at each position.
The empty suffix is an internal base case and does not create an extra trailing space.

## Common mistakes
Using a boolean word-break DP answers existence but loses all sentence choices.
Adding a space after every word creates malformed trailing spaces.
Forgetting memoization can time out on repeated-character strings.

## Language notes
Python stores suffix lists in a dictionary keyed by start index.
Java uses `HashMap<Integer, List<String>>` and creates substring values for candidate words.
Both implementations return output order based on increasing end positions, while the contract compares unordered results.
