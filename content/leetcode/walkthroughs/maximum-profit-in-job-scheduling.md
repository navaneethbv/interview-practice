## Intuition

After sorting jobs by finish time, every compatible earlier job appears before the current job.
For each job, the best schedule either skips it or takes its payment plus the best schedule whose finish time is at most its start time.
Binary search finds that compatible boundary without scanning all earlier jobs.

## Brute force

Trying every subset of jobs is exponential because each job can be accepted or rejected.
A dynamic program that scans all earlier jobs for every current job takes O(n²), which is too slow for 50,000 jobs.

## Approach

1. Build `(finish_time, start_time, payment)` records and sort them by `finish_time`.
2. Keep `end_times` in that same sorted order and let `best_profit[i]` be the best result using the first `i` jobs.
3. For each job, use `bisect_right` as an upper-bound search to find `previous_job`, the count of jobs ending no later than its start.
4. Compare `skip_profit = best_profit[-1]` with `take_profit = best_profit[previous_job] + payment`.
5. Append the larger value and return the final entry.

## Walkthrough

Example 1 has jobs written as `(start_time, finish_time, payment)`: `(1,3,5)`, `(2,4,6)`, and `(3,5,7)`.
The code stores those same jobs as `(finish_time, start_time, payment)`: `(3,1,5)`, `(4,2,6)`, and `(5,3,7)`.

| stored `(finish, start, payment)` | `previous_job` | skip profit | take profit | `best_profit` |
| --- | ---: | ---: | ---: | ---: |
| `(3,1,5)` | 0 | 0 | 5 | `[0, 5]` |
| `(4,2,6)` | 0 | 5 | 6 | `[0, 5, 6]` |
| `(5,3,7)` | 1 | 6 | 12 | `[0, 5, 6, 12]` |

The third job can follow the first because both meet at time 3, giving 12.

## Complexity

- Time: O(n log n), for sorting and one binary search per job.
- Space: O(n), for the sorted job records, finish times, and dynamic programming values.

## Edge cases

Jobs with equal boundaries are compatible because `bisect_right` includes an exact finish time.
One job returns its payment.
Overlapping jobs are compared individually, so the most profitable one wins.
Input arrays may be unsorted because the records are reordered together.

## Common mistakes

- Using `bisect_left` rejects a job that starts when another ends.
- Sorting only one input array breaks the relationship between each job's times and payment.
- Adding the current job to the previous state instead of the compatible state allows overlaps.

## Language notes

Python uses `bisect_right` directly on `end_times`.
Java stores each job in an array, sorts with a comparator, and performs the same lower-bound style search in `findCompatibleCount`.
The Java result uses `int`, which matches the spec's return type and maximum payment bounds.
