# First Unique Number

Maintain an insertion-ordered stream of integers.
Construct FirstUnique from nums, add(value) appends one value, and showFirstUnique() returns the earliest value that has appeared exactly once so far, or -1.

## Examples

### Example 1

```text
Input: constructor = [[2, 3]], operations = ["showFirstUnique", "add", "showFirstUnique", "add", "showFirstUnique"], arguments = [[], [2], [], [3], []]
Output: [2, null, 3, null, -1]
Explanation: Repeating 2 and then 3 removes both unique candidates.
```

### Example 2

```text
Input: constructor = [[7, 7]], operations = ["showFirstUnique", "add", "showFirstUnique"], arguments = [[], [8], []]
Output: [-1, null, 8]
Explanation: The new value 8 becomes the only unique value.
```

## Constraints

- 1 <= initial nums.length <= 100000
- 1 <= value, nums[i] <= 1000000000
- At most 50000 method calls.
