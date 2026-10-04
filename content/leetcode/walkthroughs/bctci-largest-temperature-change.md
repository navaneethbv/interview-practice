## Intuition

A window's largest temperature change is its maximum minus its minimum.
Two monotone deques maintain these extrema as the fixed-width window moves, discarding values that can never become an extremum again.

## Brute force

Scanning every length-k window for its minimum and maximum takes O(nk) time.
A monotone deque makes each temperature enter and leave its candidate structure at most once.

## Approach

For minima, remove trailing candidates whose values are at least the new value; for maxima, remove those at most the new value.
Store indices so expired candidates can be removed from the front.
Once a full width-k window exists, read both deque fronts and compare their difference with best.
A newer dominating value is at least as useful and remains in the window longer, making removal of the older candidate safe.

## Walkthrough

```text
Input: [[3, 1, 6, 2], 2]
Output: 5
```

Example 1 has width two.
Window `[3, 1]` has range 2.
Window `[1, 6]` has minimum 1 and maximum 6, giving range 5.
Window `[6, 2]` gives range 4.
Taking the maximum of these three differences returns 5.
The result measures within-window extrema, not merely a signed endpoint subtraction.

## Complexity

Each deque operation is amortized constant time, giving O(n) total time.
Python computes and stores complete arrays of window lows and highs, so its extra space is O(n).
Java combines both deques in one pass and uses O(k) space.

## Edge cases

If k equals the full length, inspect the range of the whole array.
Equal temperatures produce zero change.
Negative temperatures use the same ordering rules.

## Common mistakes

Expire indices outside the window before reading extrema.
Do not return a result for an incomplete initial window.

## Language notes

Python factors minimum and maximum scans into `_window_extrema`.
Java maintains two ArrayDeques simultaneously; the bounded temperature range keeps the difference safely within int.
