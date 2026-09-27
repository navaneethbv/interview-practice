# Minimized Maximum of Products Distributed to Any Store

Distribute every product to n stores.
A store may receive products of only one type, and some stores may remain empty.
Return the smallest possible maximum number of products assigned to any store.

## Examples

### Example 1

```text
Input: n = 6, quantities = [11, 6]
Output: 3
Explanation: Split the first type among four stores and the second among two.
```

### Example 2

```text
Input: n = 2, quantities = [5, 8]
Output: 8
Explanation: Each type needs its own store.
```

## Constraints

- 1 <= quantities.length <= n <= 100000
- 1 <= quantities[i] <= 100000
