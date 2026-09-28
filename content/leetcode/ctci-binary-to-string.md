# Binary to String

A real number strictly between 0 and 1 is given as a double.
Return its exact binary representation as a string that starts with `"0."`.
If the exact representation needs more than 32 digits after the binary point, return `"ERROR"`.

## Examples

### Example 1

```text
Input: num = 0.625
Output: "0.101"
Explanation: 0.625 = 1/2 + 1/8.
```

### Example 2

```text
Input: num = 0.1
Output: "ERROR"
Explanation: One tenth has no finite binary expansion.
```

## Constraints

- `0 < num < 1`
