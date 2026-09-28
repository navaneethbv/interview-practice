## Intuition

Treat each dislike pair as an edge that requires opposite groups.
The question becomes whether the dislike graph is bipartite, so a two-color traversal handles both connected and isolated people.

## Brute force

Trying every two-group assignment takes `2^n` possibilities and checks all dislike pairs for each assignment.
Color propagation rejects an impossible odd cycle as soon as it is encountered.

## Approach

1. Build an undirected `graph` from every dislike pair.
2. For each uncolored person, start a breadth-first traversal with color 0.
3. Give every newly discovered neighbor the opposite color.
4. Return false when an edge joins equal colors, otherwise return true after all people are colored.

## Walkthrough

For Example 1, edges are `1-2`, `1-3`, and `2-4`.
Start person 1 in group 0, then place 2 and 3 in group 1.
Person 4 is opposite 2, so it joins group 0.
Every dislike crosses groups, producing the valid partition `{1,4}` and `{2,3}`.

## Complexity

Building and traversing the graph takes `O(n + d)` time for `d` dislike pairs.
The adjacency lists, color map, and queue use `O(n + d)` space.

## Edge cases

People with no dislikes start their own component and can be assigned either group.
An odd cycle such as the three pairwise dislikes in Example 2 forces a contradiction.

## Common mistakes

- Building directed edges misses the requirement that the group relation is symmetric.
- Checking only people mentioned in dislikes ignores isolated people, even though they are easy to handle.
- Reusing a color from another disconnected component is unnecessary and can obscure the invariant.

## Language notes

Python uses a list as a queue and iterates over its growing suffix, while Java uses `ArrayDeque<Integer>`.
The Java colors use `1` and `-1`, with zero reserved for unvisited people.
