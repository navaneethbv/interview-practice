# Largest Set Intersection

`sets` is a non-empty list of sets, each given as an array of distinct integers.
Exclude exactly one set so that the intersection of the remaining sets is as large as possible, and return the index of the excluded set.
If several choices tie, return the smallest index.
The intersection of zero sets is empty.

## Examples

### Example 1

```text
Input: sets = [[1, 2, 3], [3, 2, 1], [1, 4, 5], [1, 2]]
Output: 2
```

### Example 2

```text
Input: sets = [[1, 2], [3, 4], [5, 6]]
Output: 0
```

## Constraints

- `1 <= sets.length <= 10^5`
- The total number of elements is at most `10^5`.
