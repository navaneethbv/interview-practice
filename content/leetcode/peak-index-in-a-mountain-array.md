# Peak Index in a Mountain Array

The array strictly increases to one interior peak and then strictly decreases.
Return the peak index in O(log n) time.

## Examples

### Example 1

```text
Input: arr = [0, 2, 1]
Output: 1
Explanation: The middle value is the unique maximum.
```

### Example 2

```text
Input: arr = [1, 3, 5, 4, 2]
Output: 2
Explanation: The increasing and decreasing parts meet at index 2.
```

## Constraints

- 3 <= arr.length <= 100,000
- 0 <= arr[i] <= 10^6
- arr is a valid mountain with at least one entry on each side of the peak.
