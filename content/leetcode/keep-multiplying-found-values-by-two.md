# Keep Multiplying Found Values by Two

Start with original.
While that value appears anywhere in nums, double it and check again.
Return the first value not found in the array.
Array occurrences are not consumed.

## Constraints

- nums has 1 to 1000 integers from 1 to 1000.
- original ranges from 1 to 1000.

## Examples

### Example 1

```text
Input: nums = [2, 4, 8], original = 2
Output: 16
Explanation: The chain 2,4,8 is present, but 16 is absent.
```

### Example 2

```text
Input: nums = [1, 3], original = 2
Output: 2
Explanation: The starting value is already absent.
```
