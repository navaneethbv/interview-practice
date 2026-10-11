# Break a Palindrome

`palindrome` is a palindrome of lowercase letters.
Change exactly one character so that the result is not a palindrome and is the lexicographically smallest such string.
Return the result, or an empty string if no single change can break the palindrome.

## Constraints

- 1 <= palindrome.length <= 1000
- palindrome contains lowercase English letters and reads the same backwards.

## Examples

### Example 1

```text
Input: palindrome = "abccba"
Output: "aaccba"
Explanation: Changing the first b gives aaccba, the smallest non-palindrome.
```

### Example 2

```text
Input: palindrome = "a"
Output: ""
Explanation: A single character is a palindrome after any change.
```
