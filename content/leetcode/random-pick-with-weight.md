# Random Pick with Weight

Construct `Solution(w)` from positive integer weights.
Each call to `pickIndex()` returns an index `i` with probability `w[i] / sum(w)`.
Repeated calls must make fresh random selections.
Sample outputs illustrate possible draws and are not a required sequence.
Hidden traces check index validity and use a broad statistical tolerance over repeated draws.

## Examples

```text
Input: w = [2], operations = [pickIndex,pickIndex,pickIndex]
Output: [0,0,0]
Explanation: There is only one possible index.
```

```text
Input: w = [1,3], operations = [pickIndex,pickIndex,pickIndex,pickIndex]
Output: [1,0,1,1]
Explanation: Index 1 has probability 3/4 on every draw; other sequences are also valid.
```

## Constraints

- 1 <= w.length <= 10,000
- 1 <= w[i] <= 100,000
- The sum of weights fits a signed 32-bit integer.
- Calls must choose according to weights rather than a fixed index or cycle.
