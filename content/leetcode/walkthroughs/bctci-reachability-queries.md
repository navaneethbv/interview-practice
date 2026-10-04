## Intuition

In an undirected graph, reachability partitions vertices into connected components.
Two vertices can reach each other exactly when they belong to the same component.
Label those components once, then each query becomes a comparison of two labels.

## Brute force

Run a fresh depth-first or breadth-first search for every query.
This can cost O(q times (V + E)) for q queries, repeatedly exploring the same connected regions.

## Approach

Initialize every entry in `label` to -1, meaning unvisited.
For each still-unvisited start vertex, assign its own index as a component label and begin an iterative depth-first search.
When discovering an unlabeled neighbor, assign that same start label before pushing it onto the stack.
This prevents duplicate stack entries caused by cycles or multiple incoming discoveries.
After all components are labeled, answer each `[a, b]` by testing whether their labels match.
Keep answers in the original query order.
The particular numeric component label is arbitrary; equality is the only property queries require.

## Walkthrough

Example 1 has vertices 0, 1, 2, 4, and 5 connected through their adjacency lists.
Starting from 0 labels all five with zero.
Vertex 3 has no neighbors and is later assigned its own label 3.
The query `[0, 4]` compares equal labels and returns true.
The query `[0, 3]` compares different labels and returns false.
The output is `[true, false]`.

## Complexity

Component discovery takes O(V + E), and q label comparisons take O(q).
Both references therefore run in O(V + E + q) time.
Labels and the traversal stack use O(V) auxiliary space, plus O(q) output storage.

## Edge cases

An isolated vertex forms a component by itself and is reachable from itself.
Repeated queries reuse the same labels without additional graph traversal.

## Common mistakes

This equivalence applies to undirected connectivity; arbitrary directed reachability cannot be replaced by these labels.
Mark a vertex when pushing it, not only when removing it from the stack.

## Language notes

Python uses a list stack and a result comprehension.
Java uses `ArrayDeque` and stores results as boxed Boolean values in a list.
