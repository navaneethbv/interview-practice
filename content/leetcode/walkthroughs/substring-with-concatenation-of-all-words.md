## Intuition

Every valid substring is a sequence of equal-length words with exactly the required multiplicities.
For each word-aligned offset, a sliding window tracks those counts.

## Brute force

Checking every start and rebuilding word counts costs O(n times word count).
The aligned window reuses counts as its left edge moves.

## Approach

1. Count required words.
2. Scan each offset modulo word length.
3. Reset on an unknown word and shrink when a known word is overrepresented.
4. Record the left edge when the window contains every required word.

## Walkthrough

Example 1:

For catdogcat and words cat,dog, offset zero reads cat then dog and records index 0.
The window advances to dog then cat and records index 3.
The result is [0,3].

## Complexity

Let N be the string length, W the word length, and K the number of words.
Building required counts costs O(KW), and the aligned scans take O(N) word visits.
Python slices and Java substrings copy and hash O(W) characters per token, so total expected time is O((N+K)W).
Maps retain up to O(K) distinct keys of length W, requiring O(KW) auxiliary character storage, plus O(R) output storage for R matches.

## Edge cases

Duplicate words require frequency counts rather than a set.
An unknown word resets the current alignment window.
Results are appended by offset and scan order as required by the local comparator.

## Common mistakes

Shrink until the overrepresented word count is valid.
Do not advance by one character inside a word-aligned scan.
Record the left index after the window reaches exactly K words.

## Language notes

Python Counter tracks required and current words.
Java uses HashMap and creates fixed-length substrings for each aligned token.
