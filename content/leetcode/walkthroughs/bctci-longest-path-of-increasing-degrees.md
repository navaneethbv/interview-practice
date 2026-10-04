## Intuition

Orient each usable edge from the lower-degree endpoint to the higher-degree endpoint.
Strict increases make cycles impossible, so sorting vertices by degree supplies a valid order for longest-path dynamic programming.

## Brute force

Enumerating all simple paths is exponential.
The strict degree rule removes cyclic dependencies and lets each useful edge relax one dynamic-programming value.

## Approach

Build undirected adjacency lists and count each vertex's degree from the original graph.
Initialize `longest` to one for every vertex, representing its singleton path.
Process vertices in nondecreasing degree order.
For every neighbor with strictly larger degree, update its length with `longest[node] + 1` if larger.
Return the maximum length.
All possible preceding vertices have lower degree and have already been processed, making each value final before it is propagated.
Equal-degree edges are unusable and need no ordering among their endpoints.

## Walkthrough

```text
Input: V = 8, edges = [[0, 1], [1, 2], [2, 3], [0, 2], [0, 4], [2, 6], [3, 7], [2, 7], [4, 5], [5, 6], [6, 7]]
Output: 3
Explanation: 5, 6, 2 have degrees 2, 3, and 5.
```

Example 1 gives node 5 degree 2, node 6 degree 3, and node 2 degree 5.
The edge from 5 to 6 raises longest[6] to at least 2.
The edge from 6 to 2 then raises longest[2] to at least 3.
Only degree values 2, 3, and 5 occur, so no strictly increasing path can contain more than three nodes.
The answer is 3.

## Complexity

Building adjacency and relaxing edges takes O(V + E) time.
Sorting vertices adds O(V log V), for O(V log V + E) total time.
Storage is O(V + E).

## Edge cases

An isolated vertex still gives a one-node path.
If all degrees are equal, the answer is one.
Disconnected components are handled in the same global scan.

## Common mistakes

Return node count rather than edge count.
Do not recompute degrees after orienting or filtering edges.

## Language notes

Python sorts a range using degree keys.
Java sorts boxed vertex indices and stores lengths in an int array, preserving the same degree-based processing order.
