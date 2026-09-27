# Swap Adjacent in LR String

You may repeatedly replace XL with LX or RX with XR.
Return whether `start` can become `result`.
Thus L can move only left through X cells, while R can move only right.

## Examples

### Example 1

```text
Input: start = "RXXLRXRXL", result = "XRLXXRRLX"
Output: true
Explanation: The L and R pieces can slide through X cells without crossing.
```

### Example 2

```text
Input: start = "X", result = "L"
Output: false
Explanation: Moves cannot create a piece.
```

## Constraints

- 1 <= start.length == result.length <= 10,000
- Both strings contain only L, R, and X.
