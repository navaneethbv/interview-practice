## Intuition

The answer depends only on the sequence of ASCII letters after filtering and normalizing case.
Two pointers can compare that sequence from both ends without allocating a cleaned copy.

## Brute force

Building a lowercase filtered string and then reversing it takes O(n) extra space.
The direct scan keeps the same linear time while using constant auxiliary space.

## Approach

1. Place `left` at the beginning and `right` at the end of `s`.
2. Advance `left` past every non-letter and retreat `right` past every non-letter.
3. Compare the lowercase letters at the two pointers.
4. Return false immediately on a mismatch, otherwise move both pointers inward.
5. Return true when the pointers meet or cross.

## Walkthrough

Example 1 compares the letters in `"Bob wondered, 'Now, Bob?'"` from the outside inward.
The outer `B` and `b` match after case folding, and punctuation or spaces are skipped whenever a pointer reaches them.
The remaining pairs also match, so the scan finishes without a mismatch and returns true.

## Complexity

- Time: O(n), because each input character is passed by a pointer at most once.
- Space: O(1), excluding the input string and the constant helper state.

## Edge cases

An empty string returns true because there is no pair that can disagree.
A sentence containing no letters also returns true.
A single letter is already a palindrome regardless of case.
Digits and punctuation are ignored even when they sit between matching letters.

## Common mistakes

- Treating digits as letters changes the filtered sequence.
- Comparing original case makes valid pairs such as `B` and `b` fail.
- Moving both pointers after skipping only one side can skip a letter.
- Using Unicode letter checks would exceed this problem's explicit ASCII contract.

## Language notes

Python checks the lowercase character against `a` through `z`.
Java uses `Character.toLowerCase` but then explicitly limits the result to ASCII letters.
Both methods use the same left-first, right-second skip order as the reference code.
