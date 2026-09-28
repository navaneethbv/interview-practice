## Intuition
At time T, a worker with unit time t can remove h levels when `t*h*(h+1)/2 <= T`.
The total removable height is monotonic in T, so binary search finds the first time whose workers can remove the mountain.

## Brute force
Simulating one second at a time is infeasible for large times.
Binary searching time and solving each worker's triangular inequality is logarithmic in the answer range.

## Approach
1. Set the upper bound to the fastest worker removing the entire mountain alone.
2. For a candidate time, compute each worker's maximum removable height from the triangular formula.
3. Return feasible when those heights sum to at least the mountain height.
4. Binary-search the smallest feasible time.

## Walkthrough
Example 1 has height 4 and worker times `[2,1,1]`.
At time 2, each worker with time 1 can remove only one level, for total capacity 3, so it is insufficient.
At time 3, the worker with time 1 can remove two levels because `1*(2*3)/2 = 3`, and the other workers provide enough additional capacity.
Together they can remove at least four levels, so time 3 is feasible and the binary search returns 3.

## Complexity
Python computes each worker height with an integer square root, giving O(W log H) time over answer range H.
Java binary-searches each worker height, giving O(W log H log M) time where M is mountain height.
The worker loop and scalar bounds use O(1) auxiliary space.

## Edge cases
A single worker uses the triangular upper bound exactly.
The fastest worker determines a valid upper bound even when other workers are slower.
The candidate count can exceed the mountain height, so feasibility stops once enough height is reached.

## Common mistakes
Using `T/t` as the height ignores the increasing work per level.
Binary-searching a worker's height with a strict inequality rejects an exact triangular budget.
Returning any feasible time instead of the first one fails the minimum objective.

## Language notes
Python uses `isqrt` to solve the quadratic inequality directly.
Java uses a helper binary search for each worker and stores time bounds in `long`.
