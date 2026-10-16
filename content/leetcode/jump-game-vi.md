# Jump Game VI

Start at index 0 of `nums`. From index `i`, jump forward between 1 and `k` positions, without going beyond the array.
Your score is the sum of values at all visited indices, including the first and last.
Return the largest score achievable when you reach index `nums.length - 1`.
You must reach the last index even if its value is negative.

## Examples

### Example 1
```text
Input: nums = [1, -1, -2, 4, -7, 3], k = 2
Output: 7
```
The route through indices 0, 1, 3, 5 scores `1 - 1 + 4 + 3 = 7`.

### Example 2
```text
Input: nums = [10, -5, -2, 4, 0, 3], k = 3
Output: 17
```
Indices 0, 3, 5 give `10 + 4 + 3 = 17`.

## Constraints

- `1 <= nums.length <= 100,000`.
- `1 <= k <= nums.length`.
- `-10,000 <= nums[i] <= 10,000`.

## Approach

The best score at index `i` is `nums[i]` plus the maximum score among indices `i-k` through `i-1`. Maintain that maximum with a deque of index/score pairs in decreasing score order. Expire indices before using the front, and discard dominated scores from the back before appending the new score.

Time: `O(n)`. Auxiliary space: `O(k)`.
