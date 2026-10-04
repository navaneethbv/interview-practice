## Intuition

A contiguous interval can become all ones exactly when it contains at most k zeros.
There is no need to perform flips: counting zeros in a moving window completely captures whether that interval is achievable.

## Brute force

Enumerate every interval and count its zeros, or choose subsets of zero positions to flip.
Even maintaining counts incrementally over all intervals takes O(n squared) time.

## Approach

Track `left`, `zeros`, and `best` while advancing `right`.
Increase zeros when the incoming value is zero.
While the count exceeds k, remove the leftmost value's contribution and advance left.
After restoring validity, compare the current length with best.
Removing values cannot increase the zero count, so the window only needs forward movement.
For each right endpoint, the retained left boundary is the earliest one still satisfying the budget.

## Walkthrough

Example 1 is `[1, 0, 1, 0, 1]` with k one.
The first three values form a valid length-three window.
Adding the second zero exceeds the budget, so remove the leading one and then the first zero.
The remaining `[1, 0]` is valid.
Adding the final one makes another length-three window, leaving the answer at 3.

## Complexity

Time is O(n) since every element enters and leaves at most once.
Auxiliary space is O(1), and the input array remains unchanged.
The nested shrinking loop does not make the scan quadratic.

## Edge cases

Empty input returns zero.
With k zero, the algorithm finds the longest existing run of ones.
If the budget covers all zeros, the entire array qualifies.

## Common mistakes

Do not count ones against the flip budget or require exactly k flips.
Update best only after shrinking an invalid window.

## Language notes

Python adds boolean expressions directly into the integer zero count.
Java uses explicit conditions for increments and decrements; integer indices and counts are sufficient under the array-size constraint.
