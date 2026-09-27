## Intuition

Each guess returns how many of six positions match the secret.
Choose a candidate whose match-count groups are as balanced as possible so every answer removes many alternatives.

## Brute force

Guessing candidates in input order may discard only a few words on an unlucky answer.
At most ten guesses are allowed, so a poor fixed order can fail even when a solution exists.

## Approach

1. For each candidate, count how many remaining words fall into each possible match count.
2. Choose the word with the smallest largest group.
3. Ask Master for its match count.
4. Keep only candidates with that same match count and repeat for at most ten attempts.

## Walkthrough

Example 1:

For candidates acckzz, ccbazz, eiowzz, and abcczz with secret acckzz, the first candidate is a natural minimax choice.
Master returns 6 because all six positions match.
The method returns immediately after the secret is found.

## Complexity

With G candidates and word length L, choosing one guess costs O(G squared times L).
Across the contract's ten attempts the total is O(10 times G squared times L), with O(G) candidate storage.
The minimax score is a heuristic for reducing the largest feedback group and is not a proof that every hidden case balances perfectly.
The interactive Master call is counted separately and is limited to ten by the contract.

## Edge cases

The secret is guaranteed to be among the candidate words.
A match count of zero keeps only words differing at every position from the guess.
The method stops immediately on six matches.

## Common mistakes

Do not filter by whether a word has the same number of matching letters in any order.
Positions must match at the same indices.
Do not make an eleventh call after ten unsuccessful attempts.

## Language notes

Python uses a helper that sums positional matches with zip.
Java uses a helper over charAt and a supplied Master type without redeclaring the harness class.
