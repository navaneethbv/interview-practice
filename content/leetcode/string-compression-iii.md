# String Compression III

Scan consecutive runs in word from left to right.
Encode each run as its length followed by its character, using groups of at most nine characters.
Runs longer than nine are split into consecutive groups.
Return the concatenated encoding.

## Constraints

- word contains 1 to 200000 lowercase English letters.

## Examples

### Example 1

```text
Input: word = "aaabb"
Output: "3a2b"
Explanation: The runs have lengths three and two.
```

### Example 2

```text
Input: word = "aaaaaaaaaaa"
Output: "9a2a"
Explanation: Eleven a characters require two groups.
```
