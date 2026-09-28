## Intuition

Prerequisite questions ask whether one vertex can reach another in a directed acyclic graph.
Because there are at most 100 courses, a boolean transitive-closure table is simpler and more predictable than running a separate search for every query.

## Brute force

Running depth-first search from the first course in every query costs O(q(n+e)) in the worst case.
That repeats the same reachable relationships when many queries share a source or destination.

## Approach

1. Create `reach[source][destination]` and mark every direct prerequisite edge.
2. Treat each course in turn as `middle` in the Floyd-Warshall closure update.
3. If `source` reaches `middle`, copy every course reachable from `middle` into the source row.
4. Answer each query by reading one boolean cell in its original order.

## Walkthrough

For Example 1, `numCourses = 3`, edges `0 -> 1` and `1 -> 2`, and the initial table marks only those two direct edges.
When `middle` is 0, no earlier source reaches 0, so the table does not change.
When `middle` is 1, source 0 reaches 1, and course 1 reaches 2, so the update marks `reach[0][2]` true.
When `middle` is 2, no new destination follows from 2.
The queries `[0,2]`, `[2,0]`, and `[0,1]` therefore produce `[true, false, true]`.

## Complexity

The closure loops use O(n^3) time, and answering q queries adds O(q) time.
The boolean table uses O(n^2) space, while the result list uses O(q) additional output space.

## Edge cases

An empty prerequisite list leaves every table entry false.
A direct edge is marked before closure, so direct and indirect prerequisites are handled uniformly.
The problem promises an acyclic graph and distinct valid queries, but the closure update would still represent reachability correctly for a general directed graph.

## Common mistakes

Do not answer only from direct edges, because a path can contain multiple intermediate courses.
Do not reverse the edge direction, since `[a,b]` means `a` is needed before `b`.
Do not reorder the query results while processing the table.

## Language notes

Python stores booleans in nested lists, and Java uses a `boolean[][]` with a `List<Boolean>` result.
The Java method relies on the judge-provided collection imports and keeps primitive table storage compact.
