# All Overbooked Slots

`slots[i]` is the number of bookings already made for slot `i`, and each bulk booking `[l, r, c]` adds `c` bookings to every slot from `l` to `r` inclusive.
Return how many slots end up with more than `cap` bookings.

## Examples

### Example 1

```text
Input: slots = [0, 0, 0, 0, 0, 0], bookings = [[0, 3, 4], [2, 5, 1], [4, 4, 3]], cap = 5
Output: 0
```

### Example 2

```text
Input: slots = [1, 1, 0, 0, 2, 3], bookings = [[0, 3, 4], [2, 5, 1], [4, 4, 3]], cap = 4
Output: 5
```

## Constraints

- `1 <= slots.length <= 10^5` and `0 <= slots[i] <= 10^5`
- `0 <= bookings.length <= 10^5` and `c > 0`
- `1 <= cap <= 10^6`
