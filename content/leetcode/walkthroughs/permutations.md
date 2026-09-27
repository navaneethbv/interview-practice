## Intuition

A permutation is formed by choosing one unused value for the next position.
After making a choice, the remaining values can appear in any order.
Backtracking explores each choice sequence once and stores a completed path only at full length.

## Brute force

Generating all n! permutations is unavoidable because the output itself contains n! entries, and copying each length-n result costs O(n × n!) time and space.
A recursive search that chooses an unused value has the same output bound, while the current branch state makes each arrangement appear exactly once.
## Approach

1. Start visit with an empty path and all values in remaining.
2. If remaining is empty, append the completed path to result.
3. Otherwise, choose each value in remaining in turn.
4. Build next_remaining by removing that value, then recurse with path + [value].
5. Return to the caller and try the next value.

The Java reference expresses the same decisions with a used array and one mutable path.
The Python version copies the path and remaining list at each recursive call, which makes branch state independent.

## Walkthrough

Example 1 uses nums = [1, 2].

| path | remaining | Action |
| --- | --- | --- |
| [] | [1, 2] | choose 1 |
| [1] | [2] | choose 2 |
| [1, 2] | [] | record the first permutation |
| [] | [1, 2] | choose 2 |
| [2] | [1] | choose 1 |
| [2, 1] | [] | record the second permutation |

The result is [[1, 2], [2, 1]].

## Complexity

Let n be the number of input values.
There are n! leaves, and each Python call copies lists of up to O(n) length, so the time is O(n × n!).
The Java path also copies each completed length-n result, giving the same output-sensitive bound.
The returned permutations use O(n × n!) space.
Python retains copied paths and remaining lists across recursive frames, requiring O(n²) auxiliary space.
Java reuses one path and one used-index array, so its auxiliary space is O(n).

## Edge cases

An empty input reaches the base case and returns one empty permutation.
A single value returns one one-element permutation.
The method follows the input positions, so repeated values can produce repeated value lists if the input contains duplicates.
Negative values are treated exactly like any other selectable value.

## Common mistakes

- Reusing a value without removing it from remaining creates invalid repeated positions.
- Saving the mutable Java path instead of copying it makes every result equal to the final state.
- Returning before recording the empty permutation mishandles empty input.
- Deduplicating values would change this problem's ordinary permutation contract.

## Language notes

Python uses list slicing and concatenation to create independent recursive arguments.
Java keeps one mutable path, marks positions in used, and undoes both changes after recursion.
Both use result and path with the same conceptual roles.
