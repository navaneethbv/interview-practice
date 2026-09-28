## Intuition
The allocator needs the leftmost free contiguous block, while `freeMemory` must release every cell with an id.
An array storing zero for free and the allocation id for occupied cells directly supports both operations.
Scanning from the beginning naturally enforces the leftmost rule.

## Brute force
The simple array scan is also the appropriate bounded design.
More elaborate free-list structures could speed some operations but would need careful merging and id tracking.
The constraints permit scanning at most 1000 cells per operation.

## Approach
1. Initialize an array of `n` zero cells.
2. For `allocate`, scan left to right while tracking the current free run length.
3. When the run reaches `size`, fill that interval with `mID` and return its start.
4. If the scan ends first, return `-1` without changing memory.
5. For `freeMemory`, scan all cells, clear matching ids, and count how many were cleared.

## Walkthrough
Example 1 starts with five free cells.
Allocating size 2 with id 1 fills positions 0 and 1 and returns 0.
Allocating size 2 with id 2 fills positions 2 and 3 and returns 2.
Freeing id 1 clears positions 0 and 1 and returns 2.
The remaining free cells are positions 0, 1, and 4, which are not a contiguous run of length 3, so the final allocation returns -1.

## Complexity
Each allocation scans O(n) cells and may fill O(n) cells.
Each free operation scans O(n) cells.
The allocator stores O(n) memory and no extra index structure.

## Edge cases
An allocation larger than the array returns -1 and leaves every cell unchanged.
Several blocks can share an id, and one free call clears them all.
Freeing an absent id returns zero.
An exact full-size allocation starts at zero.

## Common mistakes
Returning any fitting block instead of the first one breaks the contract.
Freeing only the first matching block ignores repeated ids.
Treating a noncontiguous collection of free cells as one block causes invalid allocations.

## Language notes
Python stores the cells in a list and replaces the selected slice after finding a run.
Java stores an `int[]` and fills the selected cells with an explicit loop.
Both use zero as the free marker because valid memory ids are positive.
