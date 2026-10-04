## Intuition

Hilliness depends on every edge in a component, including cycle edges.
A graph traversal finds the component while its adjacency entries supply both the total gain and the number of edge endpoints.

## Brute force

Computing a hilliness score for each possible start repeats the same component traversal.
A global seen array ensures each component is evaluated only once.

## Approach

For each unseen vertex, start a stack traversal with gain and endpoints reset to zero.
For every adjacency entry, add the absolute height difference and increment endpoints, regardless of whether the neighbor is already seen.
Enqueue unseen neighbors after marking them.
In an undirected adjacency list, each edge contributes twice to both numerator and denominator, so their ratio equals the average over edges.
Update best for nonzero endpoint counts; isolated vertices contribute zero.

## Walkthrough

```text
Input: graph = [[1, 3], [0, 2], [1, 3], [0, 2]], heights = [4.0, 1.0, 3.0, 2.0]
Output: 2.0
```

Example 1 has four undirected edge gains: 3 between 0 and 1, 2 between 1 and 2, 1 between 2 and 3, and 2 between 3 and 0.
Their sum is 8 across four edges.
The adjacency traversal records gain 16 and eight endpoints because each edge appears twice.
Both calculations produce the same average, 2.0.

## Complexity

For V vertices and E listed adjacency entries, time is O(V + E).
Seen state and the traversal stack use O(V) extra space.
Heights and gains remain floating point.

## Edge cases

An isolated vertex has hilliness zero and must not divide by zero.
Equal-height endpoints add zero gain but still add to the count.
Disconnected components are scored independently.

## Common mistakes

Counting only edges leading to unseen neighbors computes a traversal-tree average and loses cycle edges.
Do not take the absolute value after summing signed differences.

## Language notes

Python uses float accumulation.
Java uses double gains and a long endpoint counter; both mark vertices when adding them to the stack.
