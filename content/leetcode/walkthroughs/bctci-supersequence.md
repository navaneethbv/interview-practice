## Intuition

Each input word imposes an order between every pair of adjacent letters.
A no-repeat supersequence exists exactly when those order constraints have no cycle.
This is a directed graph problem, so topological sorting can test whether all present letters can be placed.

## Approach

Create one graph vertex for each letter that appears and add an edge for every adjacent pair in every word.
Reject a word immediately if it repeats a letter, because the requested supersequence cannot repeat letters.
Compute indegrees and put every present zero-indegree letter into `ready`.
Repeatedly remove a ready letter, decrement its outgoing neighbors, and add neighbors whose indegree becomes zero.
The constraints are feasible exactly when the number of placed letters equals the number of distinct present letters.

## Walkthrough

For Example 1, the words add edges such as `a -> b`, `b -> c`, `b -> d`, `d -> f`, and `c -> f`.
The zero-indegree letters can begin with `a`, then `b` becomes available, followed by `c` and `d` in an order that permits `f`.
All present letters are placed, so a sequence such as `abcdfe` satisfies every word.
In Example 2, `ab` adds `a -> b` while `ba` adds `b -> a`, leaving both letters with positive indegree and revealing a cycle.

## Complexity

Let `L` be the total number of characters and let `U` be the number of distinct lowercase letters.
Building constraints and computing indegrees costs `O(L + U^2)` with the fixed 26-letter scan used by Java.
The graph and indegree state use `O(U^2)` space, which is constant under lowercase input.

## Edge cases

An input word with one letter contributes a vertex but no edge.
Repeated letters inside one word fail even if the repeated character is adjacent to itself.
Several words may repeat the same ordering edge, so the Python set and Java boolean matrix keep indegrees from being duplicated.

## Common mistakes

Checking only adjacent words or sorting the letters alphabetically ignores the actual precedence constraints.
Treating duplicate edges as separate edges can leave an indegree that never reaches zero.
Returning true after processing only some letters incorrectly accepts a cycle in an unprocessed component.

## Language notes

Python stores only letters that appear and uses sets for outgoing edges.
Java uses a 26 by 26 boolean matrix and scans all alphabet positions, which matches the lowercase contract.
Both references use `arr` and return a boolean rather than constructing the supersequence itself.
