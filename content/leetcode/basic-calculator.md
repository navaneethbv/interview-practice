# Basic Calculator

Evaluate a valid arithmetic expression containing decimal integers, +, -, parentheses, and spaces.
A minus sign may also negate a value or parenthesized expression.
Do not use an expression-evaluation library.

## Examples

### Example 1

```text
Input: s = "1 + (2 - 3)"
Output: 0
Explanation: Evaluate the parentheses first, then add 1.
```

### Example 2

```text
Input: s = "-(2+3)+4"
Output: -1
Explanation: Negate 5 and then add 4.
```

## Constraints

- 1 <= s.length <= 300,000
- All intermediate values and the result fit signed 32-bit integers.
- The expression is valid, with no unary + and no consecutive binary operators.
