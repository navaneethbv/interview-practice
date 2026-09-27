## Intuition

The requested output changes word order while preserving each word's characters.
Splitting on whitespace gives the words without their separators.
Reversing that word list and joining with one space automatically removes leading, trailing, and repeated spaces.

## Brute force

A manual scan could repeatedly find the last remaining word, append it, and remove it from the input.
Finding and copying the remaining prefix on every step can require O(S²) time for an input of length S.
It also makes whitespace handling harder because separators must be removed after every extraction.
One split, one reverse, and one join keep those concerns separate.

## Approach

1. Call `split` to obtain the nonempty words.
2. Reverse the resulting list in place.
3. Join the reversed words with exactly one space.
4. The Java version uses `trim` followed by a regular expression that treats one or more spaces as a separator.
5. The Python `split` call already collapses runs of whitespace, and the problem input contains spaces.

## Walkthrough

For Example 1, splitting `"  learn  by doing "` gives `["learn", "by", "doing"]`.
Reversing gives `["doing", "by", "learn"]`.
Joining with one space produces `"doing by learn"`.
For Example 2, the one-word list `["hello"]` is unchanged by reversal and joins back to `"hello"`.

## Complexity

Splitting, reversing, and joining take O(S) time for input length S.
The words and result require O(S) additional storage because the output is a new string.
The Java `StringBuilder` accumulates the final output without repeated immutable-string concatenation.

## Edge cases

Leading and trailing spaces disappear through tokenization.
Multiple spaces between words become one output separator.
A single word remains unchanged.
The input guarantees at least one word, so Java's trimmed split has a valid token.

## Common mistakes

Do not reverse every character, since only word order changes.
Do not preserve the original spacing, because the output requires exactly one separator.
Do not split on a single literal space in Java, because repeated spaces would create empty tokens.

## Language notes

Python mutates its temporary word list with `reverse` and then uses `join`.
Java appends words from the final index down to zero and inserts a separator only between words.
Both implementations preserve the required `reverseWords` return type.
