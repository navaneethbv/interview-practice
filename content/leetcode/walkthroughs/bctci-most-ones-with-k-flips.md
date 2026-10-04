## Intuition

A contiguous segment can become all ones exactly when it contains at most k zeros.
The problem therefore asks for the longest window satisfying a zero-count budget.
Its actual values do not need to be changed.

## Brute force

Try every start and end position and count zeros in the chosen segment.
Even with an incremental count for each start, this takes O(n squared) time.

## Approach

Maintain a window from `left` through `right` and a counter `zeros`.
Whenever the right edge advances, count the new value if it is zero.
While `zeros` exceeds k, move the left edge forward, subtracting a zero whenever one leaves.
After restoring the budget, update `best` with the window length.
This window is the longest valid one ending at the current right edge: every earlier start still includes too many zeros.
Since extending the right edge cannot reduce the zero count, rejected earlier starts never need reconsideration.

## Walkthrough

Example 1 uses `[1, 0, 1, 0, 1]` with k equal to one.
The first three entries contain one zero, producing a valid length of three.
Adding the next zero creates two zeros.
The left edge passes the first 1 and then the first 0, restoring the budget and leaving `[1, 0]`.
Adding the final 1 creates another valid length-three window.
The result is 3, attainable by flipping either zero within its corresponding three-element window.

## Complexity

Each index enters once and leaves at most once, so both references take O(n) time.
The pointers and counters occupy O(1) auxiliary space.
No copied array or explicit list of flipped positions is needed.

## Edge cases

For k equal to zero, the algorithm finds the longest existing run of ones.
Empty input returns zero, and a budget covering all zeros permits the entire array.

## Common mistakes

Shrink until the budget is satisfied rather than removing only one position.
Use the inclusive length `right - left + 1` after shrinking.

## Language notes

Python adds Boolean zero tests directly to its integer counter.
Java uses explicit conditional increments and decrements for the same transitions.
