# Sum of Subarray Minimums

Take the minimum value of every nonempty contiguous subarray and add those minima.
Return the sum modulo 1,000,000,007.

## Examples

### Example 1

```text
Input: arr = [3, 1, 2, 4]
Output: 17
Explanation: The minima of all ten subarrays sum to 17.
```

### Example 2

```text
Input: arr = [2, 2]
Output: 6
Explanation: The two singletons and the full array each have minimum 2.
```

## Constraints

- 1 <= arr.length <= 30,000
- 1 <= arr[i] <= 30,000
