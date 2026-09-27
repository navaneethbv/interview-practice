# Number of Provinces

Cities are connected according to a symmetric adjacency matrix.
A province is a maximal group joined directly or indirectly.
Return the number of provinces.

## Examples

### Example 1

```text
Input: isConnected = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
Output: 2
Explanation: Cities 0 and 1 form one province, and city 2 forms another.
```

### Example 2

```text
Input: isConnected = [[1, 0], [0, 1]]
Output: 2
Explanation: The cities have no connecting road.
```

## Constraints

- 1 <= isConnected.length == isConnected[i].length <= 200
- The matrix is symmetric and binary; every diagonal entry is 1.
