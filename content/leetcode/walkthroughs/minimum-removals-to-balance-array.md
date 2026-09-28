## Intuition
After sorting, any kept values form a balanced set when its smallest and largest values satisfy `largest <= k * smallest`.
For a fixed right endpoint, the best set is the longest contiguous sorted window whose left endpoint meets that inequality.
Keeping the longest valid window minimizes removals.

## Brute force
Checking every subset is exponential.
Even checking every pair of endpoints and scanning the enclosed values adds unnecessary quadratic work.

## Approach

1. Sort `nums`.
2. Move `right` across the sorted values.
3. Advance `left` while `nums[right] > nums[left] * k`.
4. Track the longest valid window and subtract its length from the input length.

## Walkthrough

For Example 1, `nums = [1, 3, 4, 9]` and `k = 2`, sorting leaves the same order.
At right value 1, the window length is 1.
At right value 3, `3 <= 2 * 1` is false, so move left to value 3 and keep a one-value window.
At right value 4, `4 <= 2 * 3` is true, giving window `[3, 4]` of length 2.
At right value 9, `9 <= 2 * 3` is false, so move left past 3 and then past 4 until the window `[9]` is valid.
The longest window has length 2, so 4 minus 2 equals 2 removals.

## Complexity
Sorting takes O(n log n) time.
The two pointers each move forward at most n times, so the scan takes O(n) time.
The total time is O(n log n), and sorting uses O(n) working storage in Python or the Java sorting implementation's auxiliary stack/storage.

## Edge cases
A one-element array needs zero removals.
When `k` is 1, all kept values must be equal, so duplicates can remain together.
The multiplication can exceed a 32-bit signed integer even when input values fit, so Java casts before multiplying.

## Common mistakes
Do not compare the current value with the original first element after `left` has moved.
Do not count the window as removals; subtract its length from the original array length.
Do not use floating point for the ratio condition.

## Language notes
Python sorts the list in place and uses a sliding window.
Java sorts the primitive array and casts `nums[left]` to `long` for the product.
