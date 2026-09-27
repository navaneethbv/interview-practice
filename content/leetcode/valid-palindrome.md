# Valid Palindrome

Ignore every non-alphanumeric character in `s` and compare letters without regard to case.
Return whether the remaining sequence reads identically from either direction.
An empty remaining sequence is a palindrome.

## Constraints

- `1 <= s.length <= 200000`.
- `s` contains printable ASCII characters.

## Examples

### Example 1

```text
Input: s = "Never odd or even"
Output: true
Explanation: The normalized letters read the same in both directions.
```

### Example 2

```text
Input: s = "0P"
Output: false
Explanation: The digit 0 and letter p are different.
```
