# Evaluate Reverse Polish Notation

Evaluate an expression written in postfix notation.
An integer token pushes a value; an operator takes the two latest values, applies the left operand followed by the right operand, and pushes its result.
The operators are `+`, `-`, `*`, and `/`.
Division truncates toward zero, including for negative results.

## Examples

### Example 1

```text
Input: tokens = ["5", "2", "-", "4", "*"]
Output: 12
Explanation: Subtract 2 from 5, then multiply by 4.
```

### Example 2

```text
Input: tokens = ["-7", "3", "/"]
Output: -2
Explanation: Negative division truncates toward zero.
```

## Constraints

- 1 <= tokens.length <= 10000.
- The token sequence is a valid expression.
- Integer tokens lie between -200 and 200.
- There is no division by zero, and all intermediate results fit a signed 32-bit integer.
