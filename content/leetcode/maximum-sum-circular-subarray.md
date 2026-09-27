# Maximum Sum Circular Subarray

Return the largest sum of a nonempty contiguous segment in a circular array.
A segment may wrap from the last element to the first but may use each index at most once.

## Constraints

- `1 <= nums.length <= 30000`.
- Values range from -30000 to 30000.

## Examples

### Example 1

```text
Input: nums = [5, -2, 4]
Output: 9
Explanation: Wrapping joins 4 and 5 while excluding -2.
```

### Example 2

```text
Input: nums = [-3, -1, -2]
Output: -1
Explanation: The best nonempty segment is the single -1.
```
