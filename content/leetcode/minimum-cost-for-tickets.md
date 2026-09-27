# Minimum Cost for Tickets

You will travel on each day listed in days.
A pass purchased on day d covers that day and the next 0, 6, or 29 days for a 1-day, 7-day, or 30-day pass respectively.
The three prices appear in costs in that order.
Return the smallest total cost that covers every travel day.

## Examples

### Example 1

```text
Input: days = [1, 2, 3, 4, 5, 6, 7], costs = [2, 7, 20]
Output: 7
Explanation: One weekly pass covers every trip.
```

### Example 2

```text
Input: days = [1, 40], costs = [3, 8, 20]
Output: 6
Explanation: Two daily passes are cheapest.
```

## Constraints

- 1 <= days.length <= 365.
- Travel days are strictly increasing integers from 1 through 365.
- costs contains three integers between 1 and 1000.
