# Happy Number

Repeatedly replace a positive integer by the sum of the squares of its decimal digits.
Return true if this process eventually reaches 1.
Return false if it instead repeats a value and cycles forever.

## Examples

### Example 1

```text
Input: n = 7
Output: true
Explanation: 7 becomes 49, 97, 130, 10, and then 1.
```

### Example 2

```text
Input: n = 2
Output: false
Explanation: The sequence eventually repeats without reaching 1.
```

## Constraints

- 1 <= n <= 2147483647.
