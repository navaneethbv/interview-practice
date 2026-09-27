# Basic Calculator II

Evaluate an expression of nonnegative decimal integers combined with +, -, *, /, and spaces.
Multiplication and division take precedence over addition and subtraction.
Integer division truncates toward zero.
Do not use an expression-evaluation library.

## Examples

### Example 1

```text
Input: s = "3+2*2"
Output: 7
Explanation: Multiply 2 by 2 before adding 3.
```

### Example 2

```text
Input: s = " 14-3/2 "
Output: 13
Explanation: Integer division gives 1, then subtract it from 14.
```

## Constraints

- 1 <= s.length <= 300,000
- The expression is valid and has no parentheses or unary operators.
- There is no division by zero; all numbers, intermediate results, and the final result fit signed 32-bit integers.
