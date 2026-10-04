## Intuition

Connectivity changes only when a new cable joins two previously separate groups.
Track the number of components, and the first successful union that reduces it to one identifies the requested cable index.

## Brute force

Running a fresh graph traversal after every cable would repeatedly rediscover existing connections.
A disjoint set forest records those groups incrementally, allowing redundant cables to be recognized by equal representatives.

## Approach

Initialize `parent[node] = node` and `components = V`.
For each cable, find both roots using path halving.
If roots differ, attach the first root beneath the second and decrement the count.
Return the current index once the count reaches one.

## Walkthrough

Example 1 begins with four groups.
Cable 0 joins 0 and 2, leaving three groups.
Cable 1 joins 1 and 3, leaving two.
Cable 2 joins these groups through 0 and 1, so return 2 before examining the final cable.

## Complexity

Initialization and storage are O(V).
Each find follows at most V parent links, giving a conservative O(V + EV) worst case upper bound for E cables.
Path halving improves repeated finds, but this reference does not include union by rank or size.

## Edge cases

No cables means connectivity is never achieved under the stated `V >= 2` constraint.
A cable whose endpoints already share a root changes nothing.
If the final forest has multiple components, return -1.

## Common mistakes

The answer is a zero based cable index, not the number of cables processed.
Do not decrement for a redundant edge.
Preserve cable input order because sorting it would change the meaning of the first connection time.

## Language notes

Python keeps `parent` in the enclosing method and defines a nested `find`.
Java keeps the parent array in an instance field.
Both replace a node's parent with its grandparent while searching, shortening later traversals without recursive calls.
