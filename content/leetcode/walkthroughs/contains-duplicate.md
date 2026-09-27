## Intuition

A set stores each distinct value only once.
If converting `nums` to a set reduces its size, at least one input value appeared more than once.
The Java version detects the same event during insertion and can stop as soon as it occurs.

## Approach

1. Use the hash set pattern to record distinct input values.
2. In Python, construct `set(nums)` and compare its size with the input length.
3. In Java, insert each `value` into `seen`; an insertion returning false means the value was already present.
4. Return false if no duplicate is found.

Each input position contributes either a new set entry or a repeated value.
Thus a smaller final set and a failed insertion are equivalent witnesses of duplication.
The implementations differ only in whether they stop early, not in their worst-case complexity.

## Walkthrough

Example 1 uses `nums = [6, 2, 8, 6]`.
The following table shows the conceptual set contents after each insertion, also matching Java's `seen` variable.

| `value` | Distinct values afterward | Insertion result |
| --- | --- | --- |
| 6 | `{6}` | New |
| 2 | `{6, 2}` | New |
| 8 | `{6, 2, 8}` | New |
| 6 | `{6, 2, 8}` | Already present |

Java returns true on the final insertion.
Python observes three distinct values but four input positions and returns true as well.
The ordering shown for the set is illustrative; neither implementation depends on iteration order.

## Complexity

- Time: O(n) expected, using average O(1) hash insertions for n values.
- Space: O(n), because all values may be distinct.

## Edge cases

A single value produces false.
A pair of equal values produces true, including zeros or negative values.
Both implementations also return false for an empty array, though the statement requires at least one value.
The input remains unchanged.

## Common mistakes

- Comparing only neighboring entries misses duplicates separated by other values.
- Sorting first introduces O(n log n) work when a set suffices.
- Treating negative values as invalid contradicts the input constraints.

## Language notes

Python directly compares `len(set(nums))` with `len(nums)`.
Java's `HashSet<Integer>.add` both inserts and reports whether the set changed, avoiding a separate membership lookup.
Java boxes the `int` values into `Integer` objects, so its constant storage overhead differs from Python's set even though both use O(n) space.
