# Open the Lock

A four-wheel lock starts at `0000`.
A move turns one digit up or down by one, wrapping between 0 and 9.
Never enter a combination in `deadends`, including the starting combination.
Return the fewest moves to `target`, or -1 if it is unreachable.

## Constraints

- `0 <= deadends.length <= 500`; its entries are distinct.
- Every combination is a four-digit decimal string.

## Examples

### Example 1

```text
Input: deadends = [], target = "0009"
Output: 1
Explanation: Turning the last wheel downward reaches 9 in one move.
```

### Example 2

```text
Input: deadends = ["0000"], target = "8888"
Output: -1
Explanation: The starting combination is forbidden.
```
