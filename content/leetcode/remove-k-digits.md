# Remove K Digits

Delete exactly `k` digits from nonnegative decimal string `num` to make the remaining number as small as possible.
Preserve the order of retained digits and remove leading zeros from the result.
Return 0 if nothing remains or every remaining digit is zero.

## Examples

### Example 1

```text
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Removing 4, 3, and one 2 leaves the smallest result.
```

### Example 2

```text
Input: num = "10200", k = 1
Output: "200"
Explanation: Delete the first digit and discard leading zeros.
```

## Constraints

- 1 <= k <= num.length <= 100,000
- num has no leading zero unless equal to 0.
