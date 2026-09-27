## Intuition
The array describes a permutation of indices, so following `nums[index]` eventually reaches a cycle.
Once an index has been visited, starting there cannot reveal a longer unseen cycle.

## Brute force
Following every start without a visited set can traverse the same cycle repeatedly.
In the worst case that takes O(n^2) time.
A set or boolean array records completed indices and prevents repetition.

## Approach
1. Start from each unvisited index.
2. Follow pointers until reaching a visited index while counting steps.
3. Mark every traversed index.
4. Keep the largest cycle length.

## Walkthrough
Example 1 is `[1, 2, 0, 4, 3]`.
Starting at index 0 visits 0, then 1, then 2, and returns to visited index 0, giving length 3.
Starting at index 3 visits 3, then 4, and returns to visited index 3, giving length 2.
Index 4 is already visited and contributes no new traversal.
The maximum length is therefore 3.

## Complexity
Every index is marked once, so time is O(n).
The visited set or boolean array uses O(n) auxiliary space.
The result stores one integer.

## Edge cases
A self-loop has length one.
A single cycle covering all indices returns n.
The local contract is a permutation of indices, so every pointer stays within the array and each cycle is well defined.

## Common mistakes
Resetting visited state for every start recreates the quadratic scan.
Counting the repeated closing index makes the cycle one too long.
Using values as visited keys instead of indices confuses distinct positions.

## Language notes
Python uses a set of integer indices.
Java uses a boolean array, which avoids boxing and stores one flag per index.
