## Intuition

Rotten oranges are simultaneous BFS sources.
Each fresh orange reached from the current minute becomes rotten and carries the next minute in the queue.
Counting fresh oranges tells us whether every orange was eventually reached.

## Brute force

A minute-by-minute simulation that rescans the entire grid after each wave can take O((R × C)²) time before deciding whether fresh oranges remain.
The queue stores the wave frontier directly, so each orange changes state once and the current algorithm runs in O(R × C) time.
## Approach

1. Count fresh_oranges and enqueue every rotten orange with time zero.
2. Pop an orange and inspect its four neighbors.
3. When a neighbor is fresh, mark it rotten, decrement the count, and enqueue it with one more minute.
4. Track the largest processed minute.
5. Return that minute when no fresh orange remains, otherwise return -1.

Marking on enqueue prevents the same fresh orange from being scheduled by two parents.
The queue's initial layer represents all rotten oranges at minute zero.

## Walkthrough

Example 1 uses grid = [[2, 1, 1]].

| minute | rotten positions | fresh remaining |
| ---: | --- | ---: |
| 0 | (0, 0) | 2 |
| 1 | (0, 1) | 1 |
| 2 | (0, 2) | 0 |

The queue processes the first orange, then the newly rotten neighbor, so the final answer is 2.

## Complexity

Let R and C be the grid dimensions.
Each orange changes state at most once and checks four neighbors, so time is O(R × C).
The queue can hold O(R × C) entries, giving O(R × C) auxiliary space.

## Edge cases

With no fresh oranges, the answer is zero even if the queue starts empty.
Fresh oranges separated from every rotten orange leave fresh_oranges positive and return -1.
Several initial rotten oranges spread in parallel.
Walls and empty cells are ignored by the neighbor test.

## Common mistakes

- Processing one rotten source at a time overcounts minutes.
- Marking a fresh orange only when it is removed permits duplicate queue entries.
- Returning the number of BFS layers after the queue empties can add one extra minute.
- Forgetting the unreachable fresh check returns a time for an incomplete result.

## Language notes

Python stores row, column, and minute in each deque entry.
Java uses an int array with the same three fields and a helper that returns how many oranges changed.
Both mutate the grid to record the visited state.
