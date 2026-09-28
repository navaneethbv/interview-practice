## Intuition

Every candidate has the same length, so a rolling sum can update in constant time when the window moves.
A frequency map tells whether the current window has exactly k distinct values, which is equivalent to all k values being unique.

## Brute force

Summing and checking every length-k slice independently costs O(nk) time.
Repeatedly rebuilding the set and sum ignores the one-element change between adjacent windows.

## Approach

1. Add each incoming value to `counts` and `windowSum`.
2. Once the window exceeds k elements, subtract `nums[right-k]` and remove its count if it reaches zero.
3. When the window has length k and `counts.size()` equals k, update `bestSum`.
4. Return zero if no distinct window was found.

## Walkthrough

For Example 1, `nums = [1,5,4,2,9,9,9]` and `k = 3`, the first window `[1,5,4]` has sum 10 and three keys.
After adding 2, remove 1, leaving `[5,4,2]` with sum 11.
Adding 9 removes 5 and leaves `[4,2,9]` with sum 15, the best valid window.
The next window `[2,9,9]` has only two distinct keys, so it is skipped.
The final window also repeats 9, and the answer remains 15.

## Complexity

Each value enters and leaves the frequency map once, giving O(n) expected time.
The map stores up to k distinct values, so auxiliary space is O(k), and `windowSum` uses `long` in Java to avoid overflow.

## Edge cases

If k is one, every window is distinct and its single value is considered.
Repeated values can remain in the map with a positive count while making the window invalid.
When no window has k distinct values, the initialized best sum of zero is returned.

## Common mistakes

Remove the outgoing value before checking the current length-k window.
Delete a map key only when its count reaches zero.
Use a wide running sum even when individual input values fit in an `int`.

## Language notes

Python uses `Counter`, while Java uses `HashMap<Integer,Integer>` and returns `long` as required by the spec.
The Python reference's integer arithmetic is unbounded, so only Java needs explicit widening.
