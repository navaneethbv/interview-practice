## Intuition

A course's earliest finish time is its own duration plus the largest finish time among prerequisites.
Topological order guarantees every predecessor has contributed before a course leaves the queue.

## Brute force

Trying every schedule order would be exponential and unnecessary because courses can run in parallel.
Dynamic programming on the DAG keeps the critical path only.

## Approach

1. Build outgoing edges and prerequisite indegrees.
2. Initialize each zero-indegree course with its own duration.
3. Pop ready courses and relax each child's finish time with `finish[parent] + time[child]`.
4. Return the largest finish time.

## Walkthrough

For Example 1, courses 1 and 2 start together and finish at months 3 and 2.
Course 3 waits for both, so its start is month 3 and its finish is month 8.
The maximum finish time is therefore 8.

## Complexity

For n courses and m relations, graph construction and Kahn's traversal cost O(n+m) time.
The adjacency lists, indegrees, finish array, and queue use O(n+m) space.
Python copies `time` into a list, while Java clones the duration array.

## Edge cases

With no relations, the answer is the largest individual duration.
A chain adds every duration, while independent branches overlap.
The local contract guarantees an acyclic graph.

## Common mistakes

Use the maximum predecessor finish, not a sum of parallel prerequisites.
Do not enqueue a course before all indegrees reach zero.
Index relation course numbers with the required minus-one conversion.

## Language notes

Both references mutate indegrees as edges are relaxed.
The queue order does not affect the final critical-path maximum.
