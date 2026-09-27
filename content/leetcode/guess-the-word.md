# Discover a Secret Word

One word in the provided `words` list is secret.
Call `master.guess(word)` with a candidate from that list.
It returns the number of positions whose letters equal the secret's letters, or -1 when the candidate is absent from the list.
Find the secret by actually guessing it before using up the allowed calls.
The solution returns nothing; the judge reports whether a successful guess occurred and enforces the call limit.
The `master` fixture configures the hidden interface, but your implementation must use only `master.guess()`.

## Examples

```text
Input: words = ["acckzz","ccbazz","eiowzz","abcczz"], master = {"words":["acckzz","ccbazz","eiowzz","abcczz"],"secret":"acckzz","allowedGuesses":10}
Output: true
Explanation: Guessing acckzz returns 6 and completes the task.
```

```text
Input: words = ["aaaaaa","bbbbbb","cccccc"], master = {"words":["aaaaaa","bbbbbb","cccccc"],"secret":"bbbbbb","allowedGuesses":10}
Output: true
Explanation: Feedback rules out candidates until bbbbbb is guessed.
```

## Constraints

- There are between 1 and 100 distinct candidate words.
- Every word has exactly six lowercase English letters.
- The secret appears in words.
- The local cases allow 10 guesses each and are solvable within that budget.
- Guess feedback counts equal positions, not letters appearing elsewhere.
