## Intuition

Each day has a fixed cost to become good: `max(0, 10 - value)`.
A consecutive run is achievable exactly when the sum of its day costs is at most `k`.
Because those costs are nonnegative, a sliding window can maintain the longest affordable run.

## Brute force

Try every starting day and extend the run while adding its deficits.
This straightforward enumeration needs O(n²) time in the worst case.

## Approach

Keep `left`, the current deficit sum `cost`, and the best length `best`.
For each `right`, add the new day's deficit.
While `cost > k`, remove the deficit at `sales[left]` and advance `left`.
The resulting window is affordable, and every earlier starting position would still be unaffordable.
Update `best` using `right - left + 1`.
Removing zero-cost days is sometimes necessary to reach a costly day, but each position leaves the window at most once.

## Walkthrough

Example 1 uses sales `[5, 5, 15, 0, 10]` and budget 12.
Their deficits are `[5, 5, 0, 10, 0]`.
The first three days cost 10, giving `best = 3`.
Adding the fourth day raises the cost to 20.
Removing the first two days lowers it to 10 and leaves the window starting at index 2.
Adding the final day costs nothing, producing another length-three window.
The answer remains 3.

## Complexity

Both pointers move forward at most n times, giving O(n) time.
Only counters are stored, so auxiliary space is O(1).

## Edge cases

An empty array returns 0.
With no boosts, only existing good-day runs qualify; enough boosts can make the whole array qualify.

## Common mistakes

Count missing sales, not bad days.
A day with zero sales requires ten boosts, while a day with nine requires one.

## Language notes

Python computes deficits with `max`; Java uses `Math.max` and a `long cost`.
Neither reference modifies the sales array.
