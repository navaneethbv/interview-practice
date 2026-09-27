## Intuition

A consecutive run can be summarized by its first and last values.
Scan until the next value is no longer exactly one larger.
A one-value run gets one number, while a longer run gets an arrow range.

## Brute force

A naive method could build a separate run list for every element and merge adjacent runs afterward.
That adds storage and repeated boundary checks.
The direct scan emits each range as soon as its endpoint is known.

## Approach

1. Set start at the first unprocessed value.
2. Extend end while the next value equals the current value plus one.
3. Emit one number when start equals end, otherwise emit start arrow end.
4. Move start after the completed run.
5. Continue until the array is exhausted.

## Walkthrough

Example 1 is [0,1,2,4,5,7].
The first run extends from 0 through 2 and becomes 0->2.
The next run extends from 4 through 5 and becomes 4->5.
The final value 7 is alone, so it becomes 7.
The returned ranges are 0->2, 4->5, and 7.

## Complexity

For n sorted values, each value is visited once, giving O(n) time.
The returned range strings use O(n) output space in the worst case.
The scan uses O(1) auxiliary pointer space.
Java widens the consecutive comparison to long to avoid overflow at integer limits.

## Edge cases

An empty array returns an empty list.
A singleton run uses no arrow.
A run can contain the smallest or largest allowed integer.
The sorted-input contract ensures a single forward scan finds every run.

## Common mistakes

- Treating a gap of two as consecutive produces an invalid range.
- Emitting an arrow for one value adds unnecessary text.
- Using int plus one without widening can overflow at the maximum integer.
- Forgetting to advance past the completed run repeats output.

## Language notes

Python uses formatted strings for range text.
Java concatenates values and uses String.valueOf for singleton text.
Both preserve the numeric order supplied by the input.
