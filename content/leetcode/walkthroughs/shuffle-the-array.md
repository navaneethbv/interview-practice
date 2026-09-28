## Intuition

The input is already split into the x half and y half.
Walking both halves in lockstep and appending one value from each directly constructs the required interleaving.

## Brute force

Repeatedly inserting values into the middle of a list can cause O(n²) shifts.
A preallocated result or append-only list writes each output position once.

## Approach

1. Pair `nums[index]` with `nums[n + index]` for each index.
2. Append the pair to the result in that order.
3. Return the 2n-element result.

## Walkthrough

This is Example 1 from the local statement.
For `[2,5,1,3,4,7]` and `n = 3`, the first pair is 2 and 3.
The next pairs are 5 and 4, then 1 and 7.
Appending them yields `[2,3,5,4,1,7]`.

The append-only result receives exactly two values per input pair, so its construction does not rescan or insert into the middle of the list.

## Complexity

Each of the 2n values is copied once, so time is O(n).
The returned array or list uses O(n) output space.

## Edge cases

When n is one, the two input values are already one output pair.
The contract guarantees exactly two equal halves, so every index has a matching partner.
Values may repeat and are copied by position.

## Common mistakes

Use `n + index` for the second half rather than pairing adjacent input values.
Preserve x before y in every pair.
Return a new sequence with the full 2n length.

## Language notes

Python appends pairs to a list, while Java writes directly into an allocated `int[]`.
Neither implementation mutates the input array.
