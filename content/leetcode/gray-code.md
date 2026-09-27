# Gray Code

Return any ordering of all integers from 0 through 2^n-1 that starts with 0 and changes exactly one bit between consecutive entries.
The final and first entries must also differ in exactly one bit.

## Examples

### Example 1

```text
Input: n = 2
Output: [0, 1, 3, 2]
Explanation: Each transition, including 2 back to 0, changes one bit.
```

### Example 2

```text
Input: n = 1
Output: [0, 1]
Explanation: The two values differ in their only bit.
```

## Constraints

- 1 <= n <= 16
