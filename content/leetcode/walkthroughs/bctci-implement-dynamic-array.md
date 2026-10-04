## Intuition

Keep spare capacity so most appends write directly into an existing buffer.
Grow geometrically when full and shrink only after substantial underuse, avoiding repeated reallocations around a single size boundary.

## Brute force

Allocating an exactly sized array for every append or removal copies O(n) values per update.
A long sequence of appends would then take quadratic time.

## Approach

Maintain a fixed-size buffer, logical length, and capacity.
Append doubles capacity when length equals capacity, copies live elements, and writes the new element at length.
Pop_back decrements length and halves capacity when length is at most one quarter of capacity, keeping capacity at least one.
Get and set index directly into the used prefix; size returns length.
The gap between grow and shrink thresholds leaves many cheap operations between expensive copies.
Only live elements are copied during resizing.

## Walkthrough

```text
Input: ops = ["append", "append", "get", "get", "size"], args = [[1], [2], [0], [1], []]
Output: [null, null, 1, 2, 2]
```

Example 1 starts with capacity one and length zero.
Appending 1 fills index 0.
Appending 2 first allocates capacity two and copies the existing 1, then writes 2 at index 1.
Get calls return 1 and 2, while size reports logical length two rather than the number of operations.

## Complexity

Get, set, and size take O(1) time.
Append and pop_back take amortized O(1) time, with O(n) worst-case resizing operations.
The capacity invariant gives O(n + 1) storage for n live elements.
Temporary old and new buffers during resizing stay within the same asymptotic bound.

## Edge cases

Popping to zero retains a minimum capacity of one.
Appending after shrinking must preserve surviving values.
Valid-index guarantees remove the need for error-return conventions.

## Common mistakes

Shrinking at half-full immediately after doubling can cause resize thrashing.
Do not confuse capacity with the logical size returned to callers.

## Language notes

Python uses fixed-length lists with indexed writes rather than append.
Java uses primitive arrays and `System.arraycopy`; popBack corresponds to Python's pop_back and returns no value.
