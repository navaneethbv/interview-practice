# Compare Version Numbers

Compare two dot-separated version strings by their integer revisions from left to right.
Leading zeros have no effect, and missing trailing revisions count as zero.
Return -1 if version1 is smaller, 1 if larger, or 0 if equal.

## Constraints

- Each string has 1 to 500 characters and contains valid nonempty numeric revisions.
- Each revision fits in a signed 32-bit integer.

## Examples

### Example 1

```text
Input: version1 = "2.03", version2 = "2.3.0"
Output: 0
Explanation: Leading and trailing zeros do not affect the value.
```

### Example 2

```text
Input: version1 = "1.9", version2 = "1.10"
Output: -1
Explanation: The second revisions compare as 9 and 10.
```
