## Intuition

Courses with zero remaining prerequisites can all be taken in the same semester.
Removing their outgoing edges exposes the next semester, while a cycle leaves some prerequisite counts permanently positive.

## Brute force

Choosing individual courses in arbitrary orders can explore many schedules that differ only in the order of courses within one semester.
Kahn's level-by-level topological traversal groups all currently available courses at once.

## Approach

1. Build `graph` and count each course's incoming prerequisites.
2. Put every zero-prerequisite course in `level`.
3. For each semester, process exactly that level and decrement its successors' counts.
4. Add successors that reach zero to `following`, the next semester's level.
5. Return the semester count if all `n` courses were completed, otherwise `-1`.

## Walkthrough

For Example 1, relations are `1 -> 3` and `2 -> 3`.
Courses 1 and 2 begin with zero prerequisites, so `level = [1, 2]` and semester 1 completes both.
Their edges reduce course 3's count from 2 to 0, placing it in `following`.
Semester 2 completes course 3, giving answer `2`.

## Complexity

Each course and relation is processed once, so time is `O(n + r)` for `r` relations.
The graph, prerequisite counts, and current levels use `O(n + r)` space.

## Edge cases

With no relations, every course is available in semester 1.
A cycle has no valid starting level for its cyclic portion, so `completed < n` and the method returns `-1`.

## Common mistakes

- Processing newly unlocked courses in the same level violates the earlier-semester requirement.
- Returning the number of queue iterations instead of semester levels miscounts parallel courses.
- Declaring success when the queue empties without checking `completed` accepts cycles.

## Language notes

Python uses a list of course IDs for each level, while Java uses an `ArrayDeque` and captures its size before processing.
Both decrement mutable prerequisite counts exactly once per incoming edge.
