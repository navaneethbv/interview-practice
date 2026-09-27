## Intuition

Each number contributes either plus or minus its value.
After processing a prefix, the only information needed is how many assignments reach each possible total.
A map stores only totals that are actually reachable, which is useful when the numeric range is sparse.

## Brute force

Trying both signs for every one of n values enumerates 2^n assignments and takes O(2^n) time.
The totals map merges assignments that reach the same sum, so the current dynamic program works in O(n × S), where S is the number of reachable totals in one layer.
## Approach

1. Initialize ways with one way to reach total zero.
2. For each value, create next_ways for the next prefix.
3. For every existing total, add its count to total plus value and total minus value.
4. Replace ways with next_ways and return the count for target, defaulting to zero.

Equal totals from different sign choices are merged by addition.
The map counts assignments by position, so repeated numeric values still represent independent choices.

## Walkthrough

Example 1 uses nums = [1, 1, 1] and target = 1.

| processed values | reachable totals with counts | target count |
| --- | --- | ---: |
| none | 0:1 | 0 |
| [1] | 1:1, -1:1 | 0 |
| [1, 1] | 2:1, 0:2, -2:1 | 0 |
| [1, 1, 1] | 3:1, 1:3, -1:3, -3:1 | 3 |

Three sign assignments reach total 1, so the answer is 3.

## Complexity

Let S be the largest number of distinct reachable totals in one layer.
Each of n values visits every current map entry and creates two transitions, so time is O(n × S).
The two maps use O(S) auxiliary space, with S at most 2^n and at most the numeric sum range.

## Edge cases

An empty nums list reaches target zero in one way and every other target in zero ways.
Zero values double the count for a total because plus zero and minus zero are distinct assignments.
A target outside the reachable range returns zero.
Negative totals are valid map keys.

## Common mistakes

- Keeping only one count per total loses assignments that merge at the same total.
- Treating equal values as one item undercounts repeated positions.
- Updating the same map while iterating can reuse a number more than once.
- Returning a boolean answers reachability instead of counting sign assignments.

## Language notes

Python uses Counter for integer totals and implicit zero defaults.
Java uses HashMap and merge to add counts for both transitions.
Both create a fresh next map for each input value.
