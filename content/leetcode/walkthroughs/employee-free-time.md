## Intuition

Free time appears wherever the next interval starts after the end of the merged busy intervals.
Flatten every employee's intervals, sort by start, and maintain the furthest `merged_end` reached so far.
Any gap before the next interval is shared by all employees because every busy block has already been included.

## Brute force

Checking every time unit between the earliest start and latest finish can be arbitrarily expensive when timestamps are large.
Comparing every employee pair also repeats overlap checks, while one sorted sweep handles all intervals together.

## Approach

1. Flatten `schedule` into `(start, end)` pairs and sort them by start.
2. Initialize `merged_end` from the first interval.
3. For each later interval, emit `[merged_end, start]` when `start > merged_end`.
4. Extend `merged_end` with the current finish and return the collected `Interval` objects.

## Walkthrough

Example 1 flattens and sorts to `[1,2]`, `[1,3]`, `[4,10]`, `[5,6]`.

| interval | `merged_end` before | action | `merged_end` after |
| --- | ---: | --- | ---: |
| `[1,2]` | none | initialize | 2 |
| `[1,3]` | 2 | overlap, extend | 3 |
| `[4,10]` | 3 | emit `[3,4]` | 10 |
| `[5,6]` | 10 | overlap | 10 |

The only shared free interval is `[3,4]`.

## Complexity

- Time: O(I log I), for I total intervals and their sort, followed by a linear sweep.
- Space: O(I), for the flattened list and returned free intervals.

## Edge cases

Overlapping or touching intervals do not create free time.
Intervals from one employee can overlap with another employee's intervals.
Multiple disjoint gaps are emitted in chronological order.
The contract supplies at least one interval, so initializing from the first is valid.

## Common mistakes

- Comparing only with the immediately previous finish misses a longer merged block.
- Using `start >= merged_end` emits zero-length gaps.
- Forgetting to flatten every employee misses a busy interval that closes a shared gap.

## Language notes

Python sorts tuples and constructs the helper-provided `Interval` for each gap.
Java flattens `Interval` objects, sorts by `start`, and returns new `Interval` instances.
Both references keep the original schedule objects unchanged.
