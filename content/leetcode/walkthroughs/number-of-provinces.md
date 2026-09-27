## Intuition

The adjacency matrix describes an undirected graph of directly connected cities.
A province is one connected component.
Start a traversal at each unseen city and mark every reachable city.

## Brute force

Running a fresh reachability search for every city without a visited set repeats entire components.
That can take O(n cubed) time on an n by n matrix.
A visited set or boolean array ensures each city is explored once.

## Approach

1. Create a seen marker for every city.
2. For each unseen city, increment the province count and start a stack.
3. Pop a city and inspect its row for direct connections.
4. Mark and push unseen connected neighbors.
5. Continue until all cities belong to a discovered component.

## Walkthrough

Example 1 has connections between cities 0 and 1, while city 2 is isolated.
The traversal from city 0 reaches city 1 and marks both in one province.
The outer loop then starts a second traversal at city 2.
The method returns 2.

## Complexity

For n cities, scanning every matrix row during traversal takes O(n squared) time.
The visited markers and traversal stack use O(n) auxiliary space.
The input matrix is read without modification.
The returned province count is a scalar.

## Edge cases

A city connected only to itself forms one province.
All connected cities produce one province.
No off-diagonal connections produce n provinces.
The diagonal self-connections do not create duplicate visits.

## Common mistakes

- Counting every city without checking visited overcounts one component.
- Treating a directed row as one-way ignores matrix symmetry.
- Pushing already seen neighbors can grow the stack unnecessarily.
- Using a value list instead of the matrix's city indexes loses graph identity.

## Language notes

Python uses a set and list stack.
Java delegates the component traversal to a helper that uses a boolean array and ArrayDeque.
Both perform the same component traversal.
