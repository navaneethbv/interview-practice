# Design Memory Allocator

Manage n memory units numbered from zero, initially free.
`allocate(size,mID)` reserves the leftmost contiguous free block of size units, labels them mID, and returns its start index; return -1 without changing memory if no block fits.
`freeMemory(mID)` releases every unit carrying that id and returns how many units were freed.
Several allocations may share an id.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `1 <= n, size, mID <= 1000`.
- At most 1000 operations occur.

## Examples

### Example 1

```text
Input: ctor = [5], ops = ["allocate", "allocate", "freeMemory", "allocate"], args = [[2, 1], [2, 2], [1], [3, 3]]
Output: [0, 2, 2, -1]
Explanation: Three free units exist, but they are not contiguous.
```

### Example 2

```text
Input: ctor = [4], ops = ["allocate", "allocate", "freeMemory"], args = [[1, 7], [2, 7], [7]]
Output: [0, 1, 3]
Explanation: Freeing an id releases all its allocations.
```
