# Elimination Game

Begin with the sequence 1 through n.
First sweep left to right, deleting the first value and every other value after it.
Next sweep right to left with the same rule, then continue alternating directions until one number remains.
Return that number.

## Examples

### Example 1

```text
Input: n = 9
Output: 6
Explanation: Successive remaining lists are [2,4,6,8], then [2,6], then [6].
```

### Example 2

```text
Input: n = 1
Output: 1
Explanation: No elimination round is needed.
```

## Constraints

- 1 <= n <= 1000000000.
