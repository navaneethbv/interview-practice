# Pyramid Transition Matrix

Build a pyramid by placing one block above every adjacent pair in the row below, reducing the row length by one each time.
An allowed string ABC means a block C may sit above the ordered pair A,B.
Return whether some choices can complete the pyramid with one top block.

## Examples

### Example 1

```text
Input: bottom = "ABC", allowed = ["ABD", "BCE", "DEF"]
Output: true
Explanation: The next row can be DE, which supports F.
```

### Example 2

```text
Input: bottom = "AB", allowed = ["AAA"]
Output: false
Explanation: No rule supports a block above AB.
```

## Constraints

- 2 <= bottom.length <= 6.
- 0 <= allowed.length <= 216.
- Letters are from A through F.
- Allowed triples are distinct.
