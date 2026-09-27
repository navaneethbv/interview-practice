# Mini Parser

Parse s into a NestedInteger value.
The text describes either one signed integer or a bracketed comma-separated list whose elements follow the same rules.
An empty list is allowed.
Use NestedInteger(value) for an integer, NestedInteger() for an empty list, and add(child) to append a nested value.

## Examples

### Example 1

```text
Input: s = "[-2,[5,[]],7]"
Output: [-2, [5, []], 7]
Explanation: The outer list holds an integer, a nested list, and another integer.
```

### Example 2

```text
Input: s = "-40"
Output: -40
Explanation: The result is an integer-valued NestedInteger.
```

## Constraints

- 1 <= s.length <= 50000
- s is valid serialized nested-integer data with no whitespace.
- Integer values are between -1000000 and 1000000.
