# Satisfiability of Equality Equations

Each equation states equality or inequality between two lowercase-letter variables, using forms a==b or a!=b.
Return whether integer values can be assigned to satisfy all equations simultaneously.

## Examples

### Example 1

```text
Input: equations = ["a==b", "b!=a"]
Output: false
Explanation: The equality directly contradicts the inequality.
```

### Example 2

```text
Input: equations = ["a==b", "b==c", "a!=d"]
Output: true
Explanation: Assign a, b, c one value and d another.
```

## Constraints

- 1 <= equations.length <= 500
- Each equation has exactly four characters in the stated form.
