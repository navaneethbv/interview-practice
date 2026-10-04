## Intuition

Each day has a precise repair cost: the number of additional sales required to reach 10.
Because boosts can be repeated on one day, an interval is feasible exactly when the sum of these deficits is at most k.

## Brute force

Trying every interval and recomputing its total deficit takes cubic time.
Even maintaining a running sum for each starting point remains quadratic.
Nonnegative deficits allow a single sliding-window pass.

## Approach

For each new `right` endpoint, add `max(0, 10 - value)` to `cost`.
While cost exceeds k, subtract the same deficit expression for `sales[left]` and increment left.
Then update `best` with the feasible window length.
A day already above the threshold costs zero; its surplus cannot be transferred to another day.
Shrinking never increases cost, so the left boundary moves monotonically and retains the longest affordable suffix for each endpoint.

## Walkthrough

```text
Input: sales = [5, 5, 15, 0, 10], k = 12
Output: 3
```

Example 1 has deficits `[5, 5, 0, 10, 0]` and budget 12.
The first three days cost 10, giving a feasible length of 3.
Adding the fourth day raises cost to 20.
Removing the first two days reduces it to 10, leaving the interval beginning at the original 15-sale day.
Adding the final good day produces another length-3 interval.
No longer interval fits, so the answer is 3.

## Complexity

Each index enters and leaves the window at most once.
Time is O(n) and extra space is O(1).
The code does not materialize a deficit array or mutate sales.

## Edge cases

With zero boosts, the result is the longest existing good streak.
A single zero-sale day needs ten boosts, not one.
Already-good days can extend a window for free.

## Common mistakes

Counting only bad days solves the different large-boost variant.
Subtracting sales above 10 from the cost would incorrectly create transferable credit.

## Language notes

Python uses arbitrary-precision integer arithmetic.
Java uses a long cost accumulator while indices and the returned length remain ints.
