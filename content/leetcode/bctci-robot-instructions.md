# Robot Instructions

A robot program `seq` uses the characters `L`, `R`, and `2`.
`L` and `R` are moves.
A `2` means: perform everything after this `2` twice, but during the second pass skip the instruction immediately after the `2`.
A `2` is never the last character.
Return the moves the robot makes, as a string of `L` and `R`.

## Examples

### Example 1

```text
Input: seq = "2LR"
Output: "LRR"
Explanation: Do "LR", then "R".
```

### Example 2

```text
Input: seq = "22LR"
Output: "LRRLR"
Explanation: Do "2LR" (which is "LRR"), then "LR".
```

## Constraints

- `1 <= seq.length <= 10^4`
- The output has at most `10^5` moves.
