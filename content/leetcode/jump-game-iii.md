# Jump Game III

From index i, jump to i+arr[i] or i-arr[i] when the destination remains in the array.
Starting at start, determine whether you can reach an entry equal to zero.

## Examples

### Example 1

```text
Input: arr = [4, 2, 3, 0, 3, 1, 2], start = 5
Output: true
Explanation: One route is 5 to 4 to 1 to 3, where the value is zero.
```

### Example 2

```text
Input: arr = [3, 0, 2, 1, 2], start = 2
Output: false
Explanation: Every reachable route stays away from the zero at index 1.
```

## Constraints

- 1 <= arr.length <= 50000
- 0 <= arr[i] < arr.length
- 0 <= start < arr.length
