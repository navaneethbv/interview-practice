# Evaluate Division

Equation [a,b] with value v states a / b = v.
For every query [x,y], return the implied ratio or -1.0 when it cannot be determined.
An unknown variable is undefined even when divided by itself.
The supplied equations are consistent.

## Examples

### Example 1

```text
Input: equations = [["a", "b"], ["b", "c"]], values = [2.0, 3.0], queries = [["a", "c"], ["b", "a"], ["x", "x"]]
Output: [6.0, 0.5, -1.0]
Explanation: Multiply along a to b to c; reverse an edge for b/a; x is unknown.
```

### Example 2

```text
Input: equations = [["a", "b"]], values = [4.0], queries = [["a", "a"], ["b", "b"]]
Output: [1.0, 1.0]
Explanation: Known variables divided by themselves give one.
```

## Constraints

- 1 <= equations.length == values.length <= 20
- 1 <= queries.length <= 20
- Variable names are nonempty alphanumeric strings.
- 0 < values[i] <= 20
