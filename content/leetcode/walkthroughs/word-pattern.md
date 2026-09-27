## Intuition

The pattern and the words must describe one bijection, so each pattern symbol has exactly one word and each word has exactly one symbol.
Two maps make both directions explicit and catch collisions immediately.

## Brute force

A brute force method could try every assignment of words to pattern symbols and then test each assignment.
That grows rapidly with the number of distinct symbols and repeats work that the two maps avoid.

## Approach

1. Split `s` into `words` and reject it if its length differs from `pattern`.
2. Scan paired symbols and words from left to right, using `pattern_to_word` and `word_to_pattern`.
3. Reject a pair if either existing map disagrees with it, then store both directions.
4. Return true after every pair is consistent.

## Walkthrough

For Example 1, `pattern = "abba"` and `words = ["red", "blue", "blue", "red"]`.

| pair | pattern_to_word | word_to_pattern | result |
| --- | --- | --- | --- |
| a, red | a -> red | red -> a | store |
| b, blue | a -> red, b -> blue | red -> a, blue -> b | store |
| b, blue | unchanged | unchanged | consistent |
| a, red | unchanged | unchanged | consistent |

The scan finishes with two one-to-one assignments, so the result is `true`.

## Complexity

Splitting and scanning take `O(p + w)` time, where `p` is the pattern length and `w` is the total sentence length.
The split sentence and both maps use `O(sentence length + p)` extra space.

## Edge cases

The length mismatch is rejected before any mapping is attempted.
Repeated symbols must repeat their original word, while a repeated word cannot belong to another symbol.

## Common mistakes

- Checking only the symbol-to-word map allows two symbols to share one word.
- Comparing the number of characters in `s` instead of the number of split words gives the wrong contract.
- Updating a map before checking its old value hides a contradiction.

## Language notes

Python `split()` and Java `String.split(" ")` match the statement's single-space input guarantee.
Java uses `Map<Character, String>` and `Map<String, Character>` because boxed keys make the two directions clear.
