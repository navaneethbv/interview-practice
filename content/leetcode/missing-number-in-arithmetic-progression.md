# Missing Number In Arithmetic Progression

One entry was removed from an arithmetic progression, and it was neither the first nor the last.
The remaining entries preserve their order.
Return the missing value.
The common difference may be negative or zero.

## Examples

### Example 1

```text
Input: arr = [5, 7, 11, 13]
Output: 9
Explanation: The original progression increases by 2.
```

### Example 2

```text
Input: arr = [15, 13, 12]
Output: 14
Explanation: The original progression decreases by 1.
```

## Constraints

- 3 <= arr.length <= 1,000
- 0 <= arr[i] <= 100,000
- The array results from exactly the deletion described above.
