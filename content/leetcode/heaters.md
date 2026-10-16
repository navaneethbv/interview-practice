# Heaters

Houses and heaters occupy integer positions on a straight line.
Every heater uses the same nonnegative radius `r` and covers positions at distance at most `r` from itself.
Return the smallest radius that lets every house be covered by at least one heater.
Positions need not arrive in sorted order and duplicates are allowed.

## Examples

### Example 1
```text
Input: houses = [1, 2, 3], heaters = [2]
Output: 1
```
The heater at 2 reaches houses at 1 and 3 with radius 1.

### Example 2
```text
Input: houses = [1, 5], heaters = [2]
Output: 3
```
The farther house needs radius 3, which also covers the nearer one.

## Constraints

- Each array contains between 1 and 30,000 positions.
- Every position is between 1 and 1,000,000,000 inclusive.
- There is at least one heater.
- The solution may reorder the input arrays.

## Approach

Sort both arrays. Visit houses left to right while advancing a heater pointer whenever the next heater is at least as close. Take the maximum of these nearest-heater distances.

For `n` houses and `m` heaters, sorting and scanning take `O(n log n + m log m)` time. The scan needs `O(1)` auxiliary space; library sorting can use additional memory.
