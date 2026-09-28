# Magic Balls

You start with R red, G green, and B blue balls.
An operation replaces two balls by one: equal colors keep their color, and different colors produce the third color.
Continue until one ball remains.
Return all attainable final colors as a string in alphabetical order: B, then G, then R when present.

## Constraints

- 0 <= R, G, B <= 1,000,000,000.
- R + G + B >= 1.


## Examples

### Example 1

```text
Input: [2, 1, 0]
Output: "BG"
```

### Example 2

```text
Input: [0, 0, 9]
Output: "B"
```
