## Intuition

Only a palindromic prefix can remain in place when characters are added to the front.
The longest such prefix leaves the shortest suffix to reverse and prepend.
KMP on s, a separator, and reversed s finds that longest palindromic prefix.

## Brute force

A naive method could test every prefix from longest to shortest and compare it with its reverse.
Each comparison can copy or inspect O(n) characters, producing O(n squared) time.
The prefix-function table finds the matching prefix in linear time.

## Approach

1. Build combined as s, a separator, and reverse(s).
2. Compute KMP prefix lengths for combined.
3. Read the final prefix length as the longest prefix of s matching a suffix of reverse(s).
4. Reverse the unmatched suffix of s.
5. Prepend it to s and return the palindrome.

## Walkthrough

Example 1 is aacecaaa.
The longest palindromic prefix is aacecaa, leaving the final a unmatched.
Reversing that one-character suffix adds a at the front.
The returned shortest palindrome is aaacecaaa.

## Complexity

For input length n, building the combined string and prefix table takes O(n) time.
The prefix table uses O(n) space.
The reversed string and returned result also use O(n) storage.
Python slicing and Java substring copy the unmatched portion, which remains linear.

## Edge cases

An empty string returns an empty string.
A fully palindromic input has no unmatched suffix to prepend.
A one-character input is already a palindrome.
The separator must not appear in the input alphabet under the local contract.

## Common mistakes

- Using the shortest palindromic prefix creates unnecessary prepended characters.
- Omitting the separator allows matches to cross the boundary ambiguously.
- Reversing the full string instead of only the unmatched suffix changes the result.
- Comparing only adjacent characters does not establish a palindrome.

## Language notes

Python builds the prefix list and uses reverse slicing.
Java uses StringBuilder for the reverse and charAt for KMP comparisons.
Both references return a new string because the input string is immutable.
