# Cheapest Flights Within K Stops

Each directed flight [from, to, price] travels between cities numbered 0 through `n - 1`.
Find the cheapest route from `src` to `dst` using at most `k` intermediate stops, meaning at most `k + 1` flights.
Return -1 if no route meets the limit.

## Examples

### Example 1

```text
Input: n = 3, flights = [[0, 1, 2], [1, 2, 2], [0, 2, 9]], src = 0, dst = 2, k = 1
Output: 4
Explanation: Two flights through city 1 cost 4.
```

### Example 2

```text
Input: n = 3, flights = [[0, 1, 2], [1, 2, 2], [0, 2, 9]], src = 0, dst = 2, k = 0
Output: 9
Explanation: With no intermediate stop, take the direct flight.
```

## Constraints

- 2 <= n <= 100
- 0 <= flights.length <= n * (n - 1) / 2
- Flights have distinct ordered city pairs and no self loops.
- 1 <= price <= 10,000
- src and dst are different valid city indices; 0 <= k < n.
