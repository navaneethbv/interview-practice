# Delete Operations

Apply `operations` to `nums` in order and return the elements that remain, in their original order.

- An operation `k >= 0` deletes the element at original index `k` if it is still present, and does nothing otherwise.
- An operation `-1` deletes the smallest remaining element, breaking ties by smaller original index.

## Examples

### Example 1

```text
Input: nums = [50, 30, 70, 20, 80], operations = [2, -1, 4, -1]
Output: [50]
```

### Example 2

```text
Input: nums = [1, 2, 3], operations = []
Output: [1, 2, 3]
```

## Constraints

- `1 <= nums.length <= 10^5` and `operations.length <= nums.length`
- `-1 <= operations[i] < nums.length`
