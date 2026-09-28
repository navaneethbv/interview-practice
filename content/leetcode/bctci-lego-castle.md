# Lego Castle

A 1-story Lego castle is a single 1 x 1 block.
An `n`-story castle places two `(n - 1)`-story castles side by side with a one-unit gap, then adds a row of blocks on top that spans both and the gap.
Return how many blocks an `n`-story castle needs.

## Examples

### Example 1

```text
Input: n = 2
Output: 5
```

### Example 2

```text
Input: n = 3
Output: 17
```

## Constraints

- `1 <= n <= 47`, so the answer stays within the range JSON represents exactly.
