# Matchsticks to Square

Use every matchstick exactly once to form four sides of equal length.
You may join sticks end to end but cannot break them.
Return whether a square can be formed.

## Constraints

- There are 1 to 15 positive lengths, each at most 100000000.

## Examples

### Example 1

```text
Input: matchsticks = [1, 1, 2, 2, 2]
Output: true
Explanation: The two unit sticks form one side, and each 2 forms another.
```

### Example 2

```text
Input: matchsticks = [3, 3, 3, 3, 4]
Output: false
Explanation: Total length is divisible by four, but no partition into equal sides exists.
```
