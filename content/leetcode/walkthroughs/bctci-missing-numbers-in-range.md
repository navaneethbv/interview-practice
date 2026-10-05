## Intuition

Both the requested values and the input array are ordered.
While requested values increase, array entries smaller than the current value can be discarded permanently.
A single advancing index identifies whether each requested number appears.

## Brute force

For every integer from low through high, linearly search the entire input array.
For range length R and n input elements, that costs O(nR) time.

## Approach

Initialize `index = 0` and an empty `missing` list.
For each `value` in the inclusive requested range, advance index while the current array entry is smaller.
If index has reached the end, the value is missing.
Otherwise compare `arr[index]` with value and append the value if they differ.
When equal, leave the index where it is; the next larger requested value will advance past that occurrence and any duplicates.
Sorted order guarantees no earlier discarded entry or later larger entry could be a missed match.

## Walkthrough

Example 1 uses `[6, 9, 12, 15, 18]` over range 9 through 13.
At 9, skip 6 and find 9, so nothing is emitted.
At 10, skip 9 and stop at 12; emit 10.
The same current entry proves 11 absent, then matches 12.
At 13, skip 12 and stop at 15, proving 13 absent.
The answer is `[10, 11, 13]`.

## Complexity

Let R be `high - low + 1`.
The range loop takes O(R), and the input pointer advances at most n times, for O(n + R) time.
Working space is O(1), excluding up to O(R) output values.

## Edge cases

An empty input emits the full range.
Duplicate entries and values outside the requested range do not require separate filtering.

## Common mistakes

Include high in the iteration.
Do not append duplicate missing values while skipping repeated input entries.

## Language notes

Python uses `range(low, high + 1)`.
Java uses a long loop variable and converts each emitted value to int; the stated bounds keep output values representable.
