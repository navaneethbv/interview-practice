# Lemonade Change

Lemonade costs 5 per customer.
Customers arrive in the given order, paying with a bill of 5, 10, or 20.
Starting with no cash, return whether you can provide exact change for every customer using bills received earlier.

## Examples

### Example 1

```text
Input: bills = [5, 5, 5, 10, 20]
Output: true
Explanation: Keep enough 5s and use a 10 with a 5 for the final change.
```

### Example 2

```text
Input: bills = [5, 10, 20]
Output: false
Explanation: After serving the second customer, no 5 remains for the final change.
```

## Constraints

- 1 <= bills.length <= 100000.
- Each bill is 5, 10, or 20.
