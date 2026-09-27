# Divisor Game

Alice and Bob take turns, with Alice first.
On a turn, choose a positive proper divisor x of the current n and replace n with n-x.
A player unable to move loses.
Return whether Alice wins when both play optimally.

## Constraints

- `1 <= n <= 1000`.

## Examples

### Example 1

```text
Input: n = 2
Output: true
Explanation: Alice subtracts 1, leaving Bob with no move.
```

### Example 2

```text
Input: n = 3
Output: false
Explanation: The only move leaves 2, from which Bob wins.
```
