## Intuition

Prerequisites form a directed graph from each prerequisite to the course it unlocks.
Courses with indegree zero can be taken immediately, so a queue can repeatedly remove available courses.
If some vertices remain blocked, the graph contains a cycle and no full order exists.

## Brute force

Trying every permutation of V courses and checking prerequisite edges can require O(V! × (V + E)) time, including order validation, and O(V) temporary order space.
The topological queue removes courses as soon as all prerequisites are satisfied, reducing the work to O(V + E).
## Approach

1. Build following and increment indegree for every prerequisite edge.
2. Enqueue every course whose indegree is zero.
3. Remove a course, append it to order, and decrement each following course's indegree.
4. Enqueue a course when its indegree reaches zero.
5. Return order only when it contains all numCourses; otherwise return an empty array.

This is Kahn's topological sort.
The validator accepts any valid order, so queue tie ordering does not change correctness.

## Walkthrough

Example 1 uses numCourses = 3 and prerequisites = [[2, 1], [1, 0]].

| queue | removed course | indegrees after removal |
| --- | ---: | --- |
| [0] | 0 | course 1 becomes 0 |
| [1] | 1 | course 2 becomes 0 |
| [2] | 2 | all courses are ordered |

The returned order is [0, 1, 2], which satisfies both edges.

## Complexity

Let V be numCourses and E be the number of prerequisite pairs.
Each vertex and edge is processed once, so time is O(V + E).
The adjacency lists, indegree array, queue, and output use O(V + E) space.

## Edge cases

With no prerequisites, every course enters the queue and any course order is valid.
A self-loop leaves its course with positive indegree and returns an empty array.
A cycle prevents all vertices from reaching indegree zero.
Disconnected course groups can be ordered independently.

## Common mistakes

- Reversing an edge makes a course appear before its prerequisite.
- Enqueuing every course without checking indegree ignores dependency constraints.
- Returning a partial order hides a cycle.
- Mutating the input prerequisites is unnecessary and can surprise callers.

## Language notes

Python uses deque and list comprehensions to initialize available.
Java stores the result in a fixed array and returns a zero-length array for a cycle.
Both decrement indegree only after removing the prerequisite course.
