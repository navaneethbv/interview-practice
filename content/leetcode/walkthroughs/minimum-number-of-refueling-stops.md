## Intuition

When the car reaches a point, every passed station is available for a future stop.
If more fuel is needed, taking the largest available station fuel maximizes reach for the number of stops already spent.

## Brute force

Trying every subset of stations is exponential.
A max heap greedily chooses the largest fuel among stations already reachable and is optimal for each additional stop.

## Approach

1. Add all stations whose positions are at most `reached` to `available_fuel`.
2. If the target is not reached, remove the largest fuel and add it to `reached`.
3. Count that refueling stop and repeat.
4. Return `-1` when no reachable station remains.

## Walkthrough

For Example 1, start fuel 10 reaches station 10, whose 60 fuel is available.
Taking it extends reach to 70, making stations 20, 30, and 60 available.
Taking the largest remaining fuel, 40 at position 60, extends reach to 110 and passes the target.
Two stops are used.

## Complexity

Each station enters and leaves the heap once, so time is `O(s log s)` for `s` stations.
The heap uses `O(s)` space.

## Edge cases

If the target is already within `startFuel`, the loop returns zero stops.
An unreachable first station leaves the heap empty and returns `-1`.

## Common mistakes

- Adding stations beyond current reach makes fuel appear before it can be collected.
- Choosing the nearest station rather than the largest available fuel can require extra stops.
- Treating station fuel as usable before stopping there changes the problem model.

## Language notes

Python stores negative fuel values in a min heap, while Java uses a reverse-order `PriorityQueue<Integer>`.
Both use `long` for reached distance because input fuel and target sums can exceed `int`.
