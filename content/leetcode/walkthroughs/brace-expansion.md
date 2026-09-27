## Intuition

Each ordinary letter or brace group contributes exactly one position to every output word.
The output is the Cartesian product of those independent choices.
Sorting choices within each position lets depth-first generation produce complete words directly in lexicographic order.

## Brute force

Generate every combination and then sort the complete words.
For W words of length L, sorting can cost O(W L log W), because comparisons may inspect a long common prefix.
The reference avoids this final sort by visiting each position's choices in sorted order.

## Approach

1. Parse the expression into `groups`, where each entry contains the choices for one output position.
2. Sort each brace group's single-letter choices; an ordinary letter forms a one-choice group.
3. Use backtracking through the groups, writing one selected letter into `path`.
4. When every group has been processed, copy the current path into `result`.
5. Explore all choices for one position before returning to its previous position.

A depth-first traversal completes every word beginning with a smaller prefix before trying a larger prefix.
Since group alternatives are distinct, no duplicate filtering is needed.

## Walkthrough

Example 1 uses `s = "{b,a}x{d,c}"`.
Parsing produces the sorted groups `[a,b]`, `[x]`, and `[c,d]`.

| First choice | Fixed letter | Last choice | Appended word |
| --- | --- | --- | --- |
| a | x | c | axc |
| a | x | d | axd |
| b | x | c | bxc |
| b | x | d | bxd |

Backtracking changes only the position currently being explored.
The resulting list is `["axc","axd","bxc","bxd"]` without a final sorting pass.

## Complexity

Let N be expression length, L output word length, and W the number of combinations.
Time is O(N + W L): groups have at most 26 choices, and each completed word requires an L-character copy.
Auxiliary space excluding results is O(N + L) for parsed groups, the path, and recursion.
The returned words occupy O(W L) space.

## Edge cases

An expression without braces produces one word.
An unsorted group still yields sorted output.
Fixed letters between groups stay in place.
The contract excludes nested braces and repeated alternatives within a group.

## Common mistakes

- Sorting only the original expression destroys the positions of choices.
- Forgetting to remove a Python path choice leaks letters into later branches.
- Returning combinations in input order fails lexicographic ordering for unsorted groups.

## Language notes

Python appends and pops from a list, joining it only for a completed word.
Java overwrites positions in a reusable character array and constructs a fresh String at each leaf.
Both recurse only once per output position, at most the expression's 50-character length.
