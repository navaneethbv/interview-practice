# Langton's Ant

An ant sits on an infinite grid of white squares, facing right.
On each move it looks at its current square:

- On a white square it turns the square black, turns 90 degrees clockwise, and steps forward one square.
- On a black square it turns the square white, turns 90 degrees counterclockwise, and steps forward one square.

Simulate `K` moves and return the final grid as a list of strings, top row first.
Show the smallest rectangle that contains every square the ant has occupied, including where it started.
Draw white squares as `_` and black squares as `X`, except that the ant's current square shows its heading as `L`, `U`, `R`, or `D`.

## Examples

### Example 1

```text
Input: K = 0
Output: ["R"]
```

### Example 2

```text
Input: K = 2
Output: ["_X", "LX"]
Explanation: The ant turns to face down and moves, then turns to face left and moves again.
```

## Constraints

- `0 <= K <= 20,000`
