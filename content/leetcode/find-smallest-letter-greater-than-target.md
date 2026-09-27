# Find Smallest Letter Greater Than Target

In the sorted array letters, return the smallest character strictly greater than target.
If no character is greater, wrap around and return the first letter.

## Constraints

- letters contains 2 to 10000 lowercase English letters in nondecreasing order.
- At least two distinct letters exist; target is lowercase.

## Examples

### Example 1

```text
Input: letters = ["c", "f", "j"], target = "f"
Output: "j"
Explanation: The result must be strictly greater than f.
```

### Example 2

```text
Input: letters = ["c", "f", "j"], target = "z"
Output: "c"
Explanation: No greater letter exists, so wrap to c.
```
