# Laminal Arrays

`arr` has a length that is a power of 2.
The whole array is laminal, and each half of a laminal array of even length is also laminal.
Return the largest sum of any laminal array.

## Examples

### Example 1

```text
Input: arr = [3, -9, 2, 4, -1, 5, 5, -4]
Output: 6
Explanation: [2, 4] has the largest sum among all laminal arrays.
```

### Example 2

```text
Input: arr = [-2, -1, -4, -3]
Output: -1
```

## Constraints

- `1 <= arr.length <= 10^5` and the length is a power of 2.
- `-10^9 <= arr[i] <= 10^9`
