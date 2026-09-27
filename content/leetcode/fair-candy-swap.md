# Fair Candy Swap

Alice and Bob exchange exactly one candy box each.
Return `[aliceBox,bobBox]` containing the box sizes they should exchange so their total candy amounts become equal.
Any valid exchange is accepted.

## Constraints

- Both arrays have lengths from 1 to 10000 and positive sizes at most 100000.
- Initial totals differ and at least one valid exchange exists.

## Examples

### Example 1

```text
Input: aliceSizes = [1, 1], bobSizes = [2, 2]
Output: [1, 2]
Explanation: Both totals become 3 after swapping 1 for 2.
```

### Example 2

```text
Input: aliceSizes = [2], bobSizes = [1, 3]
Output: [2, 3]
Explanation: Both totals become 3.
```
