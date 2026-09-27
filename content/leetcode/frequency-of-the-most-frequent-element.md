# Frequency of the Most Frequent Element

One operation increases one array entry by 1.
After at most k operations, return the greatest possible frequency of any value.

## Examples

### Example 1

```text
Input: nums = [1, 2, 4], k = 5
Output: 3
Explanation: Increase 1 by 3 and 2 by 2 so all entries equal 4.
```

### Example 2

```text
Input: nums = [1, 4, 8, 13], k = 5
Output: 2
Explanation: At most two entries can be made equal with five increments.
```

## Constraints

- 1 <= nums.length <= 100,000
- 1 <= nums[i] <= 100,000
- 1 <= k <= 100,000
