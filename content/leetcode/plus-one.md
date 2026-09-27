# Plus One

The array stores the decimal digits of a nonnegative integer, most significant digit first.
Add one and return the resulting digit array.
Preserve the digit representation without converting the whole input to a fixed-width integer.

## Examples

### Example 1

```text
Input: digits = [1, 2, 9]
Output: [1, 3, 0]
Explanation: Adding one carries into the tens digit.
```

### Example 2

```text
Input: digits = [9, 9]
Output: [1, 0, 0]
Explanation: A new leading digit is required.
```

## Constraints

- 1 <= digits.length <= 100.
- 0 <= digits[i] <= 9.
- There are no leading zeros unless the number is zero.
