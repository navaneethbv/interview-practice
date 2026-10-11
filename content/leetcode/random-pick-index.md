# Random Pick Index

`Solution(nums)` receives an array that may contain duplicates.
`pick(target)` returns an index `i` with `nums[i] == target`, chosen uniformly at random among all such indices.
The target always occurs in `nums`.

Void operations display `null`.
Each test uses a fresh instance.

Any valid answer is accepted.

## Constraints

- 1 <= nums.length <= 2 * 10^4
- At most 10^4 calls to pick.

## Examples

### Example 1

```text
Input: ctor = [[1, 2, 3, 3, 3]], ops = ["pick", "pick", "pick"], args = [[3], [1], [3]]
Output: [4, 0, 4]
Explanation: pick(3) returns 2, 3 or 4; pick(1) must return 0.
```
