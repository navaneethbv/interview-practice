## Intuition

Balance requires choosing exactly half the points for each center.
The relevant quantity is how much assigning a point to center1 changes its cost compared with center2, rather than its absolute distance to either center.

## Brute force

Trying every half-sized subset is exponential.
Choosing each point's nearest center independently can violate the required equal group sizes.

## Approach

Compute both Euclidean distances for every point and store them in `costs`.
Sort pairs by `first - second`.
Assign the first half to center1 and the remaining half to center2, summing the corresponding distances.
Imagine initially assigning everything to center2: selecting a point for center1 changes the baseline total by precisely its sorted difference.
The smallest half of these differences minimizes the change.
Exchanging a selected larger difference for an unselected smaller one can never increase the total, proving the greedy choice.

## Walkthrough

```text
Input: points = [[0, 1], [1, 0], [-1, 0], [0, -1]], center1 = [0, 0], center2 = [1, 1]
Output: 4.0
```

All four points in Example 1 are distance 1 from center1.
The points `[-1, 0]` and `[0, -1]` are distance square-root-of-five from center2, so their differences are smaller.
Assign them to center1 and the other two points to center2.
Every chosen distance is 1, giving total 4.

## Complexity

With n points, distance calculation is O(n), sorting is O(n log n), and summation is O(n).
The costs collection and sorting workspace use O(n) extra space.

## Edge cases

Zero points yield total zero.
Coincident centers make every difference zero, so any balanced assignment works.
Repeated points remain separate assignment choices.

## Common mistakes

Sorting only by distance to center1 ignores the opportunity cost at center2.
Squared distances cannot replace Euclidean distances when minimizing a sum of distances.

## Language notes

Python uses `math.dist` and Java uses `Math.hypot`.
Both return floating-point totals, which the problem accepts within its stated tolerance.
