# Peaks and Valleys

In an array, a peak is an element greater than or equal to its neighbors and a valley is an element less than or equal to its neighbors.
Rearrange the numbers so that they alternate between peaks and valleys, and return the rearranged array.
Formally, every element other than the first and last must be at least both neighbors or at most both neighbors.
Any valid arrangement is accepted.

## Examples

### Example 1

```text
Input: array = [5, 3, 1, 2, 3]
Output: [5, 1, 3, 2, 3]
Explanation: 5 and 3 are peaks; 1 and 2 are valleys.
```

### Example 2

```text
Input: array = [1, 2]
Output: [1, 2]
```

## Constraints

- `0 <= array.length <= 100,000`
- `-10^9 <= array[i] <= 10^9`
