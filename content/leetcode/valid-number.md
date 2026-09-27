# Valid Number

Decide whether s represents a decimal number with an optional exponent.
The mantissa may begin with `+` or `-` and must contain at least one digit; it may contain one decimal point.
An optional `e` or `E` suffix is followed by an integer exponent, which may have a sign but must contain digits.
Spaces and other letters are not valid.

## Examples

### Example 1

```text
Input: s = "-.75e+2"
Output: true
Explanation: The mantissa -.75 and exponent +2 are both valid.
```

### Example 2

```text
Input: s = "1e"
Output: false
Explanation: An exponent must contain digits.
```

## Constraints

- 1 <= s.length <= 20.
- s may contain letters, digits, signs, or periods.
