## Intuition

The next legal neighbors depend on whether the upcoming move must add or remove a letter.
Search states therefore include both the current word and the next operation, rather than only the word.

## Brute force

Enumerating whole chains by backtracking can revisit many equivalent continuations.
A state graph shares those continuations while preserving the alternating-move restriction.

## Approach

Put both `(word1, add)` and `(word1, remove)` in the BFS queue because either first move is allowed.
Generate candidates by inserting each alphabet letter at every position or deleting each position, then keep only dictionary words.
Every transition flips the required next operation.
Mark states on enqueue and return true on reaching word2.
For either chosen first operation, lengths alternate between two adjacent sizes, so a given word has one next-operation state on that branch.
Removing any repeated-state cycle therefore yields a chain without repeated words.

## Walkthrough

```text
Input: word1 = "leap", word2 = "hop", words = ["fare", "hug", "car", "vibes", "once", "sop", "far", "ounce", "slap", "sap", "cart", "hung", "art", "shop", "fart", "lap", "soap", "are", "hop", "care", "leap", "bounce", "beyond", "cracking"]
Output: true
Explanation: leap, lap, slap, sap, soap, sop, shop, hop.
```

Example 1 follows leap to lap by deletion, then slap by insertion.
Deleting gives sap, inserting gives soap, deleting gives sop, inserting gives shop, and deleting gives hop.
Every intermediate word is listed, character order is preserved, and operations alternate throughout.
The target is therefore reachable without repeating a word.

## Complexity

For W words of maximum length L and fixed alphabet size 26, at most two states per word are visited.
Constructing and hashing all insertion/deletion candidates gives O(26WL squared) expected time.
Stored dictionary and states require O(WL) character storage, with additional temporary candidate lists per expanded state.

## Edge cases

Repeated letters can generate the same candidate through different edit positions; seen states prevent duplicate search work.
A direct single edit is valid with the appropriate initial state.

## Common mistakes

Do not allow substitutions or reorder existing letters.
Using a word-only seen set can discard the other legitimate initial-operation branch.

## Language notes

Python uses tuple states and string slicing.
Java encodes move and word into its seen key and uses substring concatenation; both costs include constructing the candidate strings.
