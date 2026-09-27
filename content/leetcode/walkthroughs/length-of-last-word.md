## Intuition

Trailing spaces do not belong to the last word.
Start at the end, skip those spaces, then count backward until the preceding space or beginning.
This avoids constructing a trimmed copy or splitting the whole sentence.

## Brute force

A split-based solution creates a collection of every word and then measures its last element.
It takes O(n) time but can use O(n) additional storage for tokens.
The backward scan uses constant auxiliary space while still reading only the necessary suffix.

## Approach

1. Set index to the final character.
2. Skip spaces while index remains in the string.
3. Count non-space characters while moving index left.
4. Return the count when the scan reaches a space or the beginning.

## Walkthrough

Example 1 is learn every day followed by two spaces.
The scan skips both trailing spaces and stops on the y in day.
It counts y, a, and d while moving left.
The preceding space ends the scan, so the method returns 3.

## Complexity

For a string of length n, the two backward loops together inspect each character at most once.
The time complexity is O(n), and auxiliary space is O(1).
No substring, split array, or trimmed copy is created.
The returned length is a scalar.

## Edge cases

A single word returns its full length.
Trailing spaces are ignored.
The statement guarantees at least one word, so a valid call reaches a non-space character.
A word at the beginning is counted correctly when the scan reaches index zero.

## Common mistakes

- Counting trailing spaces as letters overstates the answer.
- Stopping the first loop at index zero without checking the character can miss a one-word input.
- Calling split and indexing an empty token list mishandles all-space input outside the stated guarantee.
- Scanning from the start requires extra state for the current word.

## Language notes

Python indexes the string directly and does not call split.
Java guards every charAt access with index at least zero.
Both implementations count characters rather than returning the word itself.
