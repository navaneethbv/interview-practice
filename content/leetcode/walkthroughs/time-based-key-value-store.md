## Intuition

Each key's updates arrive in increasing timestamp order, so its history is already sorted.
A query asks for the last update at or before a requested time.
Find the first later timestamp with binary search, then step back once.

## Brute force

Store the histories and scan a key's entire update list on every query, remembering the latest eligible value.
That takes O(m) time per query for m updates to that key.
Binary search reduces it to O(log(m + 1)) without requiring a different storage order.

## Approach

1. Use a hash map `history` from keys to append-only lists of timestamp/value entries.
2. In `set`, append the new entry to that key's list.
3. In `get`, retrieve `entries`, using an empty list for an unknown key.
4. Binary-search a half-open interval `[left, right)` for the first timestamp greater than the requested one.
5. When the midpoint is eligible, move `left` to `middle + 1`; otherwise set `right = middle`.
6. Return the value at `left - 1`, or an empty string if `left` is zero.

All entries before the final boundary are eligible, and all entries at or after it are too late.
The immediately preceding entry is therefore the most recent eligible update.
Increasing set timestamps make sorting unnecessary.

## Walkthrough

Example 1 operates on the key `color`.

| Operation | History or boundary | Output |
| --- | --- | --- |
| `set(color, red, 2)` | `[(2,red)]` | null |
| `get(color, 3)` | Boundary 1; use entry 0 | red |
| `set(color, blue, 5)` | `[(2,red),(5,blue)]` | null |
| `get(color, 4)` | Timestamp 5 is too late; boundary 1 | red |
| `get(color, 5)` | Both entries eligible; boundary 2 | blue |

Thus the outputs are `[null, "red", null, "red", "blue"]`.

## Complexity

- Time: expected amortized O(1) per `set`, and expected O(log(m + 1)) per `get`, treating the bounded-length keys as constant-size.
- Space: O(S) stored entries for S set calls, including their bounded-length keys and values; each query uses O(1) auxiliary storage.

## Edge cases

An unknown key returns an empty string.
A timestamp before the first update gives boundary zero.
An exact timestamp match must be included, while a query after the latest update returns its value.
Histories for different keys remain independent.

## Common mistakes

- Searching only for exact timestamp equality misses values that remain active between updates.
- Using `<` instead of `<=` excludes an update at the requested timestamp.
- Overwriting the key's previous value discards history required by older-time queries.

## Language notes

Python stores tuples in lists; Java stores `Entry` records in `ArrayList` instances.
Both use indexed list access so each midpoint lookup is constant time.
The Java default empty list is only read, never mutated.
