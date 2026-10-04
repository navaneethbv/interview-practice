## Intuition

A string with no repeated letters is an ordering of distinct characters.
Each input word imposes precedence constraints between its consecutive letters.
A shared ordering exists exactly when these constraints contain no directed cycle and no individual word repeats a letter.

## Brute force

Try every permutation of the observed letters and test whether every word is a subsequence.
The factorial number of orderings is unnecessary because only their relative-order constraints matter.

## Approach

Reject any word that contains a repeated letter, since no distinct-letter supersequence can include both occurrences.
Add a directed edge between each consecutive pair in every word.
Deduplicate edges so repeated constraints do not inflate indegrees.
Count incoming edges for every observed letter, then place all zero-indegree letters in `ready`.
Repeatedly remove one ready letter, increment `placed`, and decrease the indegrees of its outgoing neighbors.
A neighbor becomes ready when all its prerequisites have been placed.
Return whether placed equals the number of observed letters.
Unplaced letters imply a cycle, whose mutually contradictory ordering requirements cannot be satisfied.

## Walkthrough

Example 1 imposes a before b before c, b before d before e, d before f, and c before f before e.
One valid topological order places a, b, c, d, f, then e.
The resulting `abcdfe` contains every input word as a subsequence without repeating a character.
Thus all observed letters can be placed and the method returns true.
The implementation need not construct that string because only existence is requested.

## Complexity

For total input length L and alphabet size A, Python takes O(L + A + E) expected time for distinct precedence edges E.
Java scans a fixed A by A matrix, taking O(L + A squared) time.
Both use O(A squared) worst-case graph space; here A is only 26.

## Edge cases

Single-letter words add vertices without edges.
Empty words add no constraints.
Inputs `ab` and `ba` create a directed cycle and must fail.

## Common mistakes

Checking only repeated letters within words misses contradictions between different words.
Count duplicate edges once so indegrees match the edges actually removed.

## Language notes

Python uses sets of outgoing letters and a list stack.
Java uses a Boolean adjacency matrix and `ArrayDeque`, exploiting the fixed lowercase alphabet.
