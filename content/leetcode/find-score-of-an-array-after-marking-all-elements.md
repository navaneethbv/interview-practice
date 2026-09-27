# Find Score of an Array After Marking All Elements

Repeatedly select the smallest unmarked value, breaking ties by smallest index.
Add that value to your score and mark its position plus its existing immediate neighbors.
Continue until all positions are marked, and return the total score.

## Examples

### Example 1

```text
Input: nums = [2, 1, 3, 4, 5, 2]
Output: 7
Explanation: Select values 1, 2, and 4 after accounting for newly marked neighbors.
```

### Example 2

```text
Input: nums = [5]
Output: 5
Explanation: The single entry is selected once.
```

## Constraints

- 1 <= nums.length <= 100,000
- 1 <= nums[i] <= 10^6
