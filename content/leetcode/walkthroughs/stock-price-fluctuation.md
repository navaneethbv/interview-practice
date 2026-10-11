## Intuition

A correction replaces a value, so the maximum and minimum must forget the old price. A map from timestamp to price plus a sorted multiset of the current prices supports replacement and both extremes.

## Approach

1. Keep `prices[timestamp]` and the latest timestamp seen.
2. Keep a multiset of current prices (a TreeMap from price to count).
3. On update, remove the old price for that timestamp from the multiset if there was one, then add the new price.
4. `current` reads the latest timestamp; `maximum` and `minimum` read the ends of the multiset.

## Walkthrough

In Example 1, prices 10 and 5 give maximum 10. Correcting timestamp 1 to 3 removes 10, so the maximum becomes 5. Adding 2 at timestamp 4 makes the minimum 2.

## Complexity

- Time: O(log n) per call.
- Space: O(n).

## Edge cases

- Several timestamps can share a price; the multiset counts them.
- An out-of-order update does not change `current` unless its timestamp is the latest.

## Common mistakes

- Treating the most recent call as current instead of the largest timestamp.
- Keeping the old price after a correction.

## Reference notes

The Python reference uses two heaps with lazy deletion: an entry is stale when its timestamp now has a different price.
