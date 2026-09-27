# Final Element After Subarray Deletions

Alice and Bob alternate turns, with Alice first.
A turn removes any nonempty contiguous subarray smaller than the whole current array, then joins the remaining pieces.
Play ends with one value.
Alice maximizes that final value and Bob minimizes it.
Return the result when both play optimally.

## Examples

### Example 1

```text
Input: nums = [4, 99, 2]
Output: 4
Explanation: Alice can remove the suffix to keep 4; leaving the middle value allows Bob to discard it.
```

### Example 2

```text
Input: nums = [3, 8]
Output: 8
Explanation: Alice removes the first value.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= nums[i] <= 100000
