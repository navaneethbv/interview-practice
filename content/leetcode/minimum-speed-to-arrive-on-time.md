# Minimum Speed to Arrive on Time

Travel the train distances in order using a common positive integer speed.
Each train except the final one is followed by waiting until the next integer hour before departing again.
Return the smallest speed that finishes within hour, or -1 if impossible.

## Constraints

- `1 <= dist.length <= 100000`; distances are positive integers no larger than 100000.
- hour is positive with at most two decimal places.
- Any feasible minimum speed is at most 10000000.

## Examples

### Example 1

```text
Input: dist = [1, 3, 2], hour = 2.5
Output: 4
Explanation: Speed 4 takes 1 + 1 + 0.5 hours.
```

### Example 2

```text
Input: dist = [1, 1], hour = 1.0
Output: -1
Explanation: The first leg requires a whole hour and the last needs additional time.
```
