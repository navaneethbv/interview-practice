## Intuition

Each encoded run represents a consecutive block of equal values.
Two runs overlap for the smaller of their remaining lengths.
Multiplying the overlapping values produces one output run, and adjacent equal products can be merged.

## Brute force

A naive solution could fully expand both encoded arrays, multiply every position, and compress the result afterward.
If the expanded length is L, that uses O(L) temporary storage and O(L) time before compression.
Two run pointers process each block directly without materializing the expanded arrays.

## Approach

1. Point into the current run of each encoded array and store each run's remaining length.
2. Take the smaller remaining length as the overlap length.
3. Multiply the two current values and append or merge that product run.
4. Subtract the overlap from both remaining lengths.
5. Advance whichever run reaches zero and continue until the first encoded array is consumed.

## Walkthrough

Example 1 has encoded1 [1,3], [2,3] and encoded2 [6,3], [3,3].
The first runs overlap for length 3 and produce value 6 for count 3.
Both first runs end, so the second runs overlap for another length 3.
Their product is also 6, so the adjacent result runs merge into [6,6].

## Complexity

Let r and s be the numbers of runs and L the expanded length.
The two pointers advance through runs, so time is O(r plus s) plus O(q) output construction.
The output contains q merged runs and uses O(q) space.
The algorithm stores O(1) remaining-count state beyond the output.
It never allocates storage proportional to L.

## Edge cases

A run may end before the other run and advance independently.
Equal adjacent products must merge to preserve canonical run encoding.
The encoded inputs are assumed to represent equal expanded lengths.
A single pair of runs returns one product run.

## Common mistakes

- Advancing both pointers after every overlap skips the unconsumed part of a longer run.
- Failing to merge equal products produces a noncanonical answer.
- Multiplying counts instead of values changes the expanded result.
- Expanding the arrays defeats the purpose of run-length encoding.

## Language notes

Python stores output runs as two-element lists so their counts can be merged in place.
Java stores mutable two-element ArrayLists and uses the harness-provided collection types.
Both references advance a run only after its remaining count reaches zero.
