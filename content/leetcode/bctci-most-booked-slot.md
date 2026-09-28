# Most Booked Slot

`slots[i]` is the number of bookings already made for slot `i`, and each bulk booking `[l, r, c]` adds `c` bookings to every slot from `l` to `r` inclusive.
Return the index of the most booked slot, choosing the earliest on a tie.

## Examples

### Example 1

```text
Input: slots = [0, 0, 0, 0, 0, 0], bookings = [[0, 3, 4], [2, 5, 1], [4, 4, 3]]
Output: 2
```

### Example 2

```text
Input: slots = [1, 1, 0, 0, 2, 3], bookings = [[0, 3, 4], [2, 5, 1], [4, 4, 3]]
Output: 4
```

## Constraints

- `1 <= slots.length <= 10^5` and `0 <= slots[i] <= 10^5`
- `0 <= bookings.length <= 10^5` and `c > 0`
