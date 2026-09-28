# Boolean Evaluation

A boolean expression alternates the digits `0` (false) and `1` (true) with the operators `&`, `|`, and `^`.
Count the ways to fully parenthesize it so that it evaluates to `result`.

## Examples

### Example 1

```text
Input: expression = "1^0|0|1", result = false
Output: 2
Explanation: 1^((0|0)|1) and 1^(0|(0|1)) are false.
```

### Example 2

```text
Input: expression = "0&0&0&1^1|0", result = true
Output: 10
```

## Constraints

- `expression` has between 1 and 15 digits.
- `expression` is well formed.
- The answer fits in a 32-bit signed integer.
