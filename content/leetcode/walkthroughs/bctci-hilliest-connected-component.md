## Intuition

A component's hilliness depends on its edges collectively, so first explore one entire component and accumulate its edge gains.
Compare component averages only after completing each traversal, rather than selecting the largest individual edge.

## Brute force

Computing a separate component for every starting vertex repeats work.
A persistent `seen` array lets the outer loop start one traversal per component, including isolated vertices that have no edge gains.

## Approach

For each unseen `start`, use a stack and mark vertices when pushing.
For every adjacency entry, add the absolute height difference to `gain` and increment `endpoints`.
After exploration, update `best` with `gain / endpoints` if any entries were encountered.

## Walkthrough

Example 1 is one four vertex cycle.
Its undirected edge gains are 3, 2, 1, and 2, totaling 8 over four edges.
The adjacency scan counts each edge twice, producing gain 16 and endpoints 8.
Their ratio is still 2.0.

## Complexity

Every vertex and adjacency entry is examined once, giving O(V + E) time for an undirected graph with E edges.
The visited array and explicit stack use O(V) auxiliary space.
Only constant aggregate state is retained per component.

## Edge cases

An isolated vertex has hilliness zero and does not trigger division.
All equal heights also produce zero.
Fractional heights must retain fractional differences and averages.
Disconnected components are compared separately even when their edge counts differ.

## Common mistakes

Count gains for all adjacency entries, including neighbors already visited.
Counting only traversal tree edges would omit cycle edges.
If counting each undirected edge twice, keep both numerator and denominator doubled rather than dividing only one of them.

## Language notes

Python initializes `gain` and `best` as floating point values.
Java uses `double` for gains and a `long` adjacency count.
Both references take absolute endpoint differences and rely on the graph's undirected adjacency contract.
