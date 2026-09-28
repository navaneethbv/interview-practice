## Intuition

Every length-k binary substring maps to an integer from 0 through `2^k - 1`.
A rolling bit value identifies the newest window without rebuilding a substring each time.

## Brute force

Creating and inserting `s[i:i+k]` for every window is simpler but copies k characters per window.
Integer windows use fixed-size updates and direct indexing.

## Approach

1. If there are fewer than `2^k` windows, return false immediately.
2. Shift the rolling value left, add the next bit, and mask away older bits.
3. Once a full window exists, mark its integer code as seen.
4. Return true when all `2^k` codes have appeared.

## Walkthrough

For Example 1, `00110110` with k=2 has windows `00`, `01`, `11`, `10`, `01`, `11`, and `10`.
The rolling codes visit 0, 1, 3, and 2 in the first four windows.
All four values from 0 through 3 are seen, so the result is true.

## Complexity

For string length N, the scan costs O(N) time.
Python's set uses O(min(N,2^k)) space, while Java's boolean array uses O(2^k) space.
The early window-count check avoids allocating the tracking structure when success is impossible.

## Edge cases

A string shorter than k has no full window.
For k=1, both codes must appear.
Repeated windows do not increase the distinct count twice.

## Common mistakes

Mask after adding each bit so old bits cannot remain.
Start recording only at index `k - 1`.
Compare the distinct count with `2^k`, not with the string length.

## Language notes

Python converts each character to an integer and stores codes in a set.
Java stores seen codes in a boolean array and tracks a separate found count.
