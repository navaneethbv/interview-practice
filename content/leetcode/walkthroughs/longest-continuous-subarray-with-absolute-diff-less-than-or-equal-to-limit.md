## Intuition

For a window to be valid, its largest and smallest values must differ by at most `limit`.
Two monotonic deques keep the indices of possible minimum and maximum values while `left` and `right` expand the window.

## Brute force

Checking every start and end pair and scanning each window for its minimum and maximum can take O(n^3) time.
Maintaining a range minimum and maximum for every start reduces this to O(n^2), but still repeats work across starts.

## Approach

1. Use a decreasing deque of indices for the current maximum and an increasing deque for the current minimum.
2. Add each new `right` index, removing trailing values that can never become the corresponding extreme.
3. While the extremes differ by more than `limit`, advance `left` and remove an index when it leaves the window.
4. Record the largest valid window length.

## Walkthrough

For Example 1, `nums = [8, 2, 4, 7]` and `limit = 4`, start with an empty window.
After reading `8`, both deques represent `[8]`, so the best length is 1.
Reading `2` gives a range of 6, so `left` advances past `8`, leaving `[2]` and best length 1.
Reading `4` leaves minimum 2 and maximum 4, so `[2,4]` is valid and best becomes 2.
Reading `7` removes the older maximum candidate 4 from the monotonic maximum deque, but the window `[2,4,7]` still has range 5.
Advancing `left` removes 2, leaving `[4,7]`, whose range is 3.
The final best length is 2, matching the two valid windows described in the statement.

## Complexity

Each index enters and leaves each deque at most once, so the time complexity is O(n).
The two deques store at most n indices, so the auxiliary space is O(n).

## Edge cases

A one-element input is always valid because its range is zero.
With `limit = 0`, only windows containing equal values can remain.
Large values are compared directly, and the stated integer bounds keep their difference within the Java `int` range.

## Common mistakes

Do not store values without indices, because an extreme must be removed when its position leaves the window.
Do not shrink only once, since several old elements may need to leave before the range becomes valid.
Do not remove every smaller deque value from the front, because only dominated values at the back are obsolete.

## Language notes

Python uses `collections.deque`, while Java uses `ArrayDeque<Integer>` for indexed monotonic queues.
The Java deque stores boxed indices, but each index is still inserted and removed only a constant number of times.
