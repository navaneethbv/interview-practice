## Intuition

Bad days divide the array into independent good-day runs.
Within a run, sales are positive, so for each ending day the valid starts form a prefix of that run's starting positions.

## Brute force

Enumerating all intervals and checking both their minimum sale value and total takes quadratic or cubic time.
A sliding sum can identify the latest qualifying start while retaining the number of earlier starts.

## Approach

On a bad day, reset `run_start`, `left`, and `window` past that day.
Otherwise add sales to window and move left while removing its sale value would still leave at least k.
If the remaining window reaches k, add `left - run_start + 1` to total.
These are exactly the starts from the beginning of the current good run through the latest feasible start.
Earlier starts only increase the sum, while later starts cannot reach k.

## Walkthrough

```text
Input: sales = [15, 20, 5, 30, 25], k = 50
Output: 1
```

Example 1 first builds the good run `[15, 20]`, whose total 35 is below 50.
The bad day 5 resets the state.
The next good run `[30, 25]` reaches total 55.
Removing 30 would leave only 25, so left stays at the 30-sale day.
Exactly one start qualifies, yielding answer 1.

## Complexity

Both boundaries advance at most n times, so time is O(n).
Counters and indices use O(1) extra space.
The result can be quadratic in n even though computation is linear.

## Edge cases

A single good day can qualify if its sales reach k.
Bad days never belong to a counted interval.
A run whose total is too small contributes nothing.

## Common mistakes

Do not add the window length; valid starts are before or at left, not after it.
Reset the sum when encountering a bad day.

## Language notes

Python integers hold large counts automatically.
Java uses long values for both cumulative sales and the number of subarrays.
