## Intuition

If a capacity ships all packages within the deadline, any larger capacity can do so as well.
That monotone feasibility condition supports binary search over capacity.
For a fixed capacity, greedily filling each day as far as possible minimizes the number of days while preserving package order.

## Brute force

Try every integer capacity between the heaviest package and the sum of all weights.
Testing one capacity scans the array, so searching an interval of width R this way takes O(nR) time.
Binary search reduces the number of feasibility scans to logarithmic in that interval width.

## Approach

1. Set `low` to the maximum package weight and `high` to the total weight.
2. Try the midpoint `capacity` while the bounds differ.
3. In `_days_needed` (Java: `daysNeeded`), maintain the current `load` and days `used`.
4. Start a new day before a package would exceed capacity, then load that package.
5. If the required days fit the deadline, keep the lower half including the midpoint; otherwise move above it.
6. Return the shared final bound.

## Walkthrough

Example 1 has `weights = [1,2,3,4,5]`, `days = 3`, and initial bounds 5 and 15.

| Capacity tried | Greedy daily loads | Days used | Updated bounds |
| --- | --- | --- | --- |
| 10 | `[1,2,3,4]`, `[5]` | 2 | 5 to 10 |
| 7 | `[1,2,3]`, `[4]`, `[5]` | 3 | 5 to 7 |
| 6 | `[1,2,3]`, `[4]`, `[5]` | 3 | 5 to 6 |
| 5 | `[1,2]`, `[3]`, `[4]`, `[5]` | 4 | 6 to 6 |

Capacity 6 is feasible, and the smaller boundary 5 is not.

## Complexity

- Time: O(n log(R + 1)), where R is the initial upper-minus-lower capacity bound, with O(n) preprocessing.
- Space: O(1), because feasibility uses scalar counters.

## Edge cases

One allowed day requires the total weight.
As many days as packages allows the heaviest-package capacity.
A package exactly filling a day does not force a new day until another package would exceed capacity.
Packages cannot be reordered.

## Common mistakes

- Starting the lower bound below the heaviest package permits impossible capacities.
- Requiring exactly `days` rejects solutions that finish early.
- Starting a new day on equality wastes capacity.

## Language notes

Python uses `max` and `sum`; Java computes both bounds together.
The total weight is at most 25 million, so Java `int` is sufficient.
Java's midpoint expression also avoids unnecessary addition of the two full bounds.
