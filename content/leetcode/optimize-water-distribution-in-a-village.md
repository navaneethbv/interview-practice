# Optimize Water Distribution in a Village

Supply water to every house numbered 1 through n.
You may build a well at house i for wells[i-1], or install any bidirectional pipe `[house1,house2,cost]`.
A house gets water when it has a well or is connected by installed pipes to a house with a well.
Return the minimum total cost.

## Constraints

- `1 <= n <= 10000`.
- There are 0 to 10000 pipes; multiple pipes may connect the same pair.
- Well and pipe costs range from 0 to 100000.

## Examples

### Example 1

```text
Input: n = 3, wells = [5, 2, 5], pipes = [[1, 2, 1], [2, 3, 1]]
Output: 4
Explanation: Build the well at house 2 and both pipes.
```

### Example 2

```text
Input: n = 2, wells = [1, 1], pipes = [[1, 2, 5]]
Output: 2
Explanation: Two separate wells are cheaper than the pipe.
```
