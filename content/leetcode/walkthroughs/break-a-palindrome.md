## Intuition

To make the string as small as possible, make the earliest possible position smaller. The best change is turning the first character that is not 'a' into 'a'. Only the first half matters: changing the middle of an odd-length palindrome keeps it a palindrome, and the second half mirrors the first.

## Approach

1. If the length is 1, return the empty string.
2. Scan the first half; at the first character that is not 'a', change it to 'a' and return.
3. If the first half is all 'a', change the last character to 'b'.

## Walkthrough

For abccba, the first non-'a' in the first half is b at index 1; changing it gives aaccba. For aaa, every first-half character is already 'a', so the last character becomes 'b': aab.

## Complexity

- Time: O(n).
- Space: O(n).

## Edge cases

- The middle character of an odd-length string is skipped.
- A string of all 'a' must change the last character to 'b', the smallest increase at the latest position.

## Common mistakes

- Scanning the whole string, which changes the middle of aba into aaa, still a palindrome.
- Changing the first character to 'b' when everything is 'a', which is larger than changing the last.
