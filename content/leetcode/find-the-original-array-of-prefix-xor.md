# Find The Original Array of Prefix Xor

`pref[i]` is the XOR of `arr[0]` through `arr[i]` for some unknown array `arr`.
Return `arr`; it is uniquely determined.

## Constraints

- 1 <= pref.length <= 10^5
- 0 <= pref[i] <= 10^6

## Examples

### Example 1

```text
Input: pref = [5, 2, 0, 3, 1]
Output: [5, 7, 2, 3, 2]
Explanation: arr = [5, 5 ^ 2, 2 ^ 0, 0 ^ 3, 3 ^ 1] = [5, 7, 2, 3, 2].
```

### Example 2

```text
Input: pref = [13]
Output: [13]
Explanation: A single prefix is the element itself.
```
