# Jump Game IX

A jump from i to a later index j is allowed when nums[j] < nums[i].
A jump to an earlier index j is allowed when nums[j] > nums[i].
For each starting index, return the largest value reachable through any number of jumps, including zero jumps.

## Examples

### Example 1

```text
Input: nums = [3, 1, 4]
Output: [3, 3, 4]
Explanation: The first two positions can reach each other; the last is isolated.
```

### Example 2

```text
Input: nums = [3, 4, 1]
Output: [4, 4, 4]
Explanation: The final 1 links both earlier positions into the same reachable group.
```

## Constraints

- 1 <= nums.length <= 100000
- 1 <= nums[i] <= 1000000000
