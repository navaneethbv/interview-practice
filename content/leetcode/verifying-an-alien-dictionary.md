# Verifying an Alien Dictionary

Determine whether `words` are sorted lexicographically under the supplied alphabet order.
At the first differing character, use its position in order.
A proper prefix must come before a longer word beginning with that prefix.

## Constraints

- There are 1 to 100 words of length 1 to 20.
- order is a permutation of all 26 lowercase English letters.

## Examples

### Example 1

```text
Input: words = ["hello", "leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: h precedes l in the custom alphabet.
```

### Example 2

```text
Input: words = ["apple", "app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: A word cannot precede its own shorter prefix.
```
