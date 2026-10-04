## Intuition

An index remains unresolved until a strictly larger value appears.
A stack of unresolved indices in nonincreasing value order lets one new element settle every smaller candidate it dominates.

## Brute force

For each position, scanning rightward until a larger element appears can take O(n squared) time on a decreasing array.
The stack shares those scans, ensuring each unresolved position is processed only when pushed and resolved.

## Approach

Initialize every answer to -1.
Scan `index, value` from left to right.
While the stack's top value is strictly smaller, pop that index and set its answer to the current index.
Finally push the current index as a new unresolved candidate.

## Walkthrough

Example 1 begins with values 2 and 2, so both indices remain on the stack because equality does not qualify.
Value 4 at index 2 pops both and assigns their answer 2.
Value 3 cannot resolve 4, leaving the final answers `[2, 2, -1, -1]`.

## Complexity

Every index is pushed once and popped at most once, giving O(n) total time despite the inner loop.
The stack uses O(n) auxiliary space, and the answer array uses O(n) output space.

## Edge cases

A decreasing or constant array has no next greater values and retains all -1 answers.
The final position always has answer -1.
Negative numbers work normally.
Several earlier positions may share the same next greater index.

## Common mistakes

Return indices, not the larger values themselves.
Use strict less than when resolving candidates so equal values remain unresolved.
Because the scan moves left to right, the first resolving value is automatically the nearest qualifying one.

## Language notes

Python uses a list as the stack of indices.
Java uses `ArrayDeque<Integer>` with operations at its last end.
Both references initialize the result before scanning and need no cleanup pass for indices that remain unresolved.
