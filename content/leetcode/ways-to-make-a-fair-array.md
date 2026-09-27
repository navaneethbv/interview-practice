# Ways to Make a Fair Array

Remove exactly one array element and shift later elements left.
Count the removal indices for which the sum at even indices equals the sum at odd indices in the resulting array.

## Constraints

- nums has 1 to 100000 integers from 1 to 10000.

## Examples

### Example 1

```text
Input: nums = [2, 1, 6, 4]
Output: 1
Explanation: Removing index 1 leaves 2,6,4 with equal parity sums of 6.
```

### Example 2

```text
Input: nums = [1, 1, 1]
Output: 3
Explanation: Removing any index leaves one value at each parity.
```
