# Prefix-Suffix Swap

`arr` has a length `n` that is a multiple of 3.
In place and with O(1) extra space, move the first `n / 3` letters to the end while keeping the order within both parts.

## Examples

### Example 1

```text
Input: arr = ["b", "a", "d", "r", "e", "v", "i", "e", "w"]
Output: ["r", "e", "v", "i", "e", "w", "b", "a", "d"]
```

### Example 2

```text
Input: arr = ["a", "b", "c"]
Output: ["b", "c", "a"]
```

## Constraints

- `0 <= arr.length <= 10^6` and the length is divisible by 3.
