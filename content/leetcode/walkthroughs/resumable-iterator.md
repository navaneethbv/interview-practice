## Intuition

A checkpoint must be small and must identify an exact place in the data even across restarts. The number of values already consumed does both. Prefix sums over file lengths turn that global position back into a file and an offset, so the state never has to store object references.

## Approach

1. Precompute the starting global position of every file.
2. `hasNext` compares the position with the total count.
3. `next` finds the file containing the position by binary search over the starts (skipping empty files), returns the value and advances.
4. `getState` returns the position; `setState` restores it.

## Walkthrough

With files [1, 2], [] and [3], positions 0, 1 and 2 map to the values 1, 2 and 3. After reading 1, the checkpoint is 1. Reading 2 and 3 exhausts the data; restoring checkpoint 1 makes the next value 2 again.

## Complexity

- Time: O(1) for next and hasNext, O(log files) for setState.
- Space: O(files).

## Edge cases

- Empty files, including at the start or end, must be skipped.
- A checkpoint taken at the very end resumes with nothing left.

## Common mistakes

- Storing the current file and offset as live objects that cannot be serialized.
- Resuming one value too early or late because the checkpoint was taken before or after advancing inconsistently.
