## Intuition
The window's score is the sum of distinct values currently inside it.
With positive numbers, once that score reaches k, moving the left edge rightward can only shorten the valid window.

## Brute force
Enumerating every subarray and rebuilding its distinct set costs O(N^2) or worse.
A frequency map lets a sliding window update the distinct sum when a value enters or leaves its last occurrence.

## Approach
1. Expand the right edge and add a value to the sum only when its count was zero.
2. While the distinct sum is at least k, record the current length and remove the left value.
3. Subtract a removed value only when its count reaches zero.
4. Return the shortest recorded length or -1 if no window qualified.

## Walkthrough
Example 1 is `[2,2,5,1]` with `k = 7`.
After adding the first three values `[2,2,5]`, the distinct sum is 7 and the window has length 3.
Removing the first 2 keeps one 2, so the sum stays 7 and the window `[2,5]` has length 2.
Removing the second 2 drops the sum to 5, so the answer is 2.

## Complexity
Each element enters and leaves the window once, giving O(N) expected time with hash-map operations.
The frequency map uses O(U) space for U distinct values.

## Edge cases
Repeated values count once in the sum but still contribute to window length.
If the total distinct sum never reaches k, return -1.
A single value qualifies only when it is at least k.

## Common mistakes
Adding every occurrence double-counts duplicates.
Removing a value from the sum while another copy remains makes later windows too small.
Using a fixed sliding-window length misses the shortest qualifying suffixes.

## Language notes
Python uses a dictionary and integer sums.
Java uses `HashMap<Integer,Integer>` and a `long` distinct sum for safe accumulation.
