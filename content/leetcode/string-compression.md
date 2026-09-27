# String Compression

Compress each consecutive run of equal characters in place.
Write the character once, followed by the decimal count when that count exceeds one.
Write each count digit as a separate character.
Return the length k of the compressed prefix; entries after k are ignored.
The displayed output is that prefix.

## Examples

### Example 1

```text
Input: chars = ["a", "a", "b", "c", "c", "c"]
Output: ["a", "2", "b", "c", "3"]
Explanation: The single b is written without a count.
```

### Example 2

```text
Input: chars = ["x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x"]
Output: ["x", "1", "2"]
Explanation: The two digits of 12 occupy separate entries.
```

## Constraints

- 1 <= chars.length <= 2000.
- Characters are lowercase letters, uppercase letters, digits, or symbols.
- Use constant extra space.
