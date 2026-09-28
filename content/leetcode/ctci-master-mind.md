# Master Mind

In Master Mind, the hidden `solution` and the `guess` are strings of four slots colored `R`, `Y`, `G`, or `B`.
A hit is a slot where the guess has the correct color.
A pseudo-hit is a correct color in the wrong slot; each solution slot can be matched at most once, and hits take priority.
Return `[hits, pseudoHits]`.

## Examples

### Example 1

```text
Input: solution = "RGBY", guess = "GGRR"
Output: [1, 1]
Explanation: Slot 1 is a hit; one R is a pseudo-hit.
```

### Example 2

```text
Input: solution = "RRRR", guess = "RRRR"
Output: [4, 0]
```

## Constraints

- `solution.length == guess.length == 4`
- Both strings contain only `R`, `Y`, `G`, and `B`.
