## Intuition

Duplicate input values should generate one permutation, not one branch per equal occurrence.
A frequency map chooses each distinct value while its remaining count is positive.

## Brute force

Generating all n factorial index permutations and deduplicating afterward wastes branches for repeated values.
It also needs extra result-set work.

## Approach

1. Count each value.
2. Append an available value to the path and decrement its count.
3. Recurse until the path length equals the input length.
4. Restore the count after backtracking and copy completed paths into the output.

## Walkthrough

Example 1:

For [1,1,2], choose 1 twice and then 2 to make [1,1,2].
Backtracking can choose 2 before the remaining 1 to make [1,2,1].
Starting with 2 and then the two 1 values makes [2,1,1].
The frequency map prevents a second identical branch for the two 1 occurrences.

## Complexity

With U unique values and R distinct permutations, the output itself costs O(Rn) space.
The search takes O(Rn) copying work plus explored prefix states, bounded by O(n times R times U).
Both references use O(n) recursion and path space beyond output.

## Edge cases

An empty input has one empty permutation under the usual permutation convention.
All equal values produce one result.
Negative values work as map keys and list elements.

## Common mistakes

Do not append the mutable path object directly without copying it.
Restore counts after every recursive branch.
Do not confuse distinct values with distinct input indices.

## Language notes

Python uses Counter and a shared path list.
Java sorts values and skips an equal value when its previous equal occurrence is unused.
