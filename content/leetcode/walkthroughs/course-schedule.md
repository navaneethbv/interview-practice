## Intuition

A course is available exactly when none of its prerequisites remain unfinished.
Completing it removes one prerequisite from each dependent course.
If this process cannot finish all courses, the remaining dependencies contain a cycle that prevents any starting point.

## Brute force

Enumerating all course permutations and testing each ordering can take O(V! × (V + E)) time.
The dependency graph already identifies locally available courses, so constructing every possible ordering is unnecessary.

## Approach

1. Use Kahn's topological-sort algorithm.
2. For a pair `[course, prerequisite]`, add an edge from the prerequisite to the course and increment `degree[course]`.
3. Initialize `queue` with every course whose degree is zero.
4. Process each queued course and decrement the degree of every `dependent`.
5. Enqueue a dependent exactly when its degree becomes zero.
6. Return whether the number processed equals `numCourses`.

Each degree measures unfinished incoming dependencies, not the number of courses that depend on this course.
A directed acyclic graph always has an available source, so the procedure consumes every course exactly when a valid ordering exists.

## Walkthrough

Example 1 uses three courses and pairs `[[1, 0], [2, 1]]`.
The initial degrees are `[0, 1, 1]` and the initial queue contains 0.

| Completed course | Degree change | Next available course |
| --- | --- | --- |
| 0 | Course 1: 1 to 0 | 1 |
| 1 | Course 2: 1 to 0 | 2 |
| 2 | None | None |

All three courses are processed, so return true.
The resulting order is 0, 1, 2.

## Complexity

- Time: O(V + E), for V courses and E prerequisite pairs.
- Space: O(V + E), storing adjacency lists, degrees, and the queue.

## Edge cases

With no prerequisites, every course starts in the queue.
Disconnected acyclic components are processed independently.
A cycle can coexist with finishable courses; processing only the finishable component still returns false.
An isolated course must be counted even though it has no edges.

## Common mistakes

- Reversing the edge while keeping the original degree update creates inconsistent data.
- Returning true because at least one course is available ignores possible cycles elsewhere.
- Enqueuing a dependent before all prerequisites are removed violates the invariant.

## Language notes

Python retains processed courses in its growing `queue` list, so its final length is the processed count.
Java removes entries from `ArrayDeque` and therefore keeps an explicit `completed` counter in `finishCourses`.
Both implementations avoid recursion-depth limits on long prerequisite chains.
