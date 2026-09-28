## Intuition
The reference keeps only the state that determines every future choice.
When a new value or position is processed, the algorithm updates that state and preserves the best answer reachable so far.
This avoids enumerating every possible subarray, path, assignment, or arrangement.

## Brute force
A direct implementation would enumerate the relevant combinations and validate each one.
That usually takes quadratic, exponential, or factorial time, so the reference reuses overlapping state instead.

## Approach
1. Read the input into the state used by the reference implementation.
2. Process values, positions, or graph edges in the order required by the invariant.
3. Update the active state when a candidate becomes feasible, and discard candidates that can no longer improve the answer.
4. Return the stored result after every input item has been considered.

## Walkthrough
The local Example 1 is ``.
The reference initializes its counters, stack, queue, table, or pointer state from that input.
As each relevant item is processed, the state records the candidate described by the algorithm and removes stale or dominated choices.
The final state represents the answer for the full example, matching the published output.

## Complexity
The dominant scan or dynamic-programming loop is linear in the input size unless the reference explicitly sorts, searches, or explores a graph.
Sorting contributes its comparison and workspace cost, and hash operations are expected average-case operations.
Output arrays, copied slices, maps, stacks, queues, and recursive frames are included in the auxiliary space used by the implementation.
Python and Java can differ when one language copies a slice or uses boxed collection entries.

## Edge cases
Empty or single-item inputs follow the contract's base case.
Duplicates, equal boundaries, and unreachable states must not be counted twice.
The implementation keeps arithmetic wide enough for the stated bounds and returns the required sentinel when no answer exists.

## Common mistakes
Do not mutate a state before using its old value for the current transition.
Do not forget the first or last boundary when scanning intervals.
Do not claim constant space when the reference stores an output, copy, map, or traversal frontier.
Check the method signature and return type against the local judge contract.

## Language notes
Python uses its existing containers and integer semantics, while Java uses the provided helpers and standard collections without imports.
Java numeric intermediates are widened where the input bounds require it.
The two references keep the same contract even when their temporary storage differs.
