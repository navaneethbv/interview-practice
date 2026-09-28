# Towers of Hanoi

Three towers are numbered 1, 2, and 3.
Tower 1 holds `n` disks in decreasing size from bottom to top, and the other towers are empty.
Move every disk to tower 3 under the usual rules: move one top disk at a time, and never place a disk on a smaller one.

Return the moves as `[from, to]` pairs in the order they are made, using the minimum number of moves.
The minimum sequence is unique.

## Examples

### Example 1

```text
Input: n = 2
Output: [[1, 2], [1, 3], [2, 3]]
```

### Example 2

```text
Input: n = 1
Output: [[1, 3]]
```

## Constraints

- `0 <= n <= 12`
