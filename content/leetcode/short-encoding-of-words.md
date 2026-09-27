# Short Encoding of Words

Encode the words in a reference string ending with `#`, where each word can be read from some start index through the next `#`.
Words that are suffixes of other encoded words may share their ending.
Return the minimum possible reference string length, including separators.

## Constraints

- There are 1 to 2000 words.
- Words contain 1 to 7 lowercase English letters.

## Examples

### Example 1

```text
Input: words = ["time", "me", "bell"]
Output: 10
Explanation: time#bell# also contains me starting inside time.
```

### Example 2

```text
Input: words = ["a", "a"]
Output: 2
Explanation: Duplicate words share the encoding a#.
```
