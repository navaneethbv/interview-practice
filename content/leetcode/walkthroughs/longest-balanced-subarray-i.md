## Intuition
For each possible subarray start, the distinct contribution of a value changes only when its latest occurrence is crossed.
When a new value appears at index `i`, it contributes its parity to every candidate start after its previous occurrence and through `i`.
That is a range addition over candidate starts.
A segment tree can maintain all distinct-even minus distinct-odd balances and find the first zero balance.

## Brute force
Enumerating all subarrays and rebuilding even and odd sets costs O(n^2) time or worse.
Tracking a set for each start still repeats most of the same work.

## Approach

1. Maintain a lazy range-add segment tree over candidate starts.
2. For each value, add +1 for even or -1 for odd starts after its previous occurrence through the current index.
3. Store the latest index for the value.
4. Search the current prefix for the earliest zero balance using tree minimum and maximum values.
5. Update the longest length ending at the current index.
Moving the start one position removes at most one distinct value, so adjacent integer balances differ by at most one.
Consequently, a fully eligible tree interval whose minimum and maximum straddle zero contains an actual zero, allowing the search to descend toward the earliest match.

## Walkthrough

For Example 1, `[2, 2, 1, 3, 4]`, the first 2 adds +1 to start 0.
The second 2 updates only start 1 because starts at or before index 0 already counted value 2.
At value 1, a -1 range update makes the balance for start 0 equal 0.
Value 3 adds another -1 only to starts after the previous 3, and value 4 adds +1 to every start through index 4.
After the final update, start 0 has balance zero, so the full length 5 is recorded.
Repeated 2s, 1s, and 3s do not add duplicate distinct contributions.

## Complexity
Each index performs one range update and one zero search, both O(log n).
The total time is O(n log n).
The segment tree, lazy tags, last-occurrence map, and arrays use O(n) auxiliary space.

## Edge cases
All-even or all-odd input may have no zero balance and returns 0.
A repeated value must update only starts after its previous occurrence.
The single-element case is never balanced because one distinct parity has count one and the other has count zero.

## Common mistakes
Updating every start for every repeated value overcounts distinct values.
Finding any zero instead of the earliest zero can miss the longest subarray ending at the current index.
Remember that the balance is even distinct values minus odd distinct values.

## Language notes
Both references use the same lazy range-add segment-tree idea.
Python stores tree arrays in a helper class, while Java keeps the arrays and helper methods as fields.
