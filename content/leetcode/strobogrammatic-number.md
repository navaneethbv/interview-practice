# Strobogrammatic Number

Determine whether the digit string looks identical after a 180-degree rotation.
Under this rotation, 0, 1, and 8 remain themselves, 6 and 9 swap, and other digits are invalid.
Rotation also reverses the order of digits.

## Examples

### Example 1

```text
Input: num = "619"
Output: true
Explanation: Rotating and reversing gives 619 again.
```

### Example 2

```text
Input: num = "68"
Output: false
Explanation: The rotated form is 89.
```

## Constraints

- 1 <= num.length <= 50.
- num contains digits and has no leading zero unless it is 0.
