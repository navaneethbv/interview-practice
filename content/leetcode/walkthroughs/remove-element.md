## Intuition

The problem only requires the values different from val to occupy the first returned positions.
A write pointer records where the next kept value belongs.
Values equal to val are ignored, and every kept value is copied forward once.

## Brute force

A direct repeated-removal implementation shifts the remaining suffix after every match.
If many values match, those shifts can take O(n squared) time.
The write scan avoids shifting and keeps the useful prefix compact in one pass.

## Approach

1. Set writeIndex to zero.
2. Read each value in its original left-to-right order.
3. When the value differs from val, write it at writeIndex.
4. Increment writeIndex only after preserving a value.
5. Return writeIndex as the length of the filtered prefix.

## Walkthrough

Example 1 has nums [3, 1, 3, 2] and val 3.
The first 3 is skipped.
The 1 is written at position 0, the next 3 is skipped, and the 2 is written at position 1.
The returned length is 2, so the meaningful prefix is [1, 2].

## Complexity

For n values, the scan performs O(n) time and uses O(1) auxiliary space.
The compacted values are written into the existing array and therefore are output storage supplied by the caller.
The order of retained values remains the original order in both references.
Values after the returned prefix are unspecified.

## Edge cases

An empty array returns zero.
If no value equals val, the returned length is the original length.
If every value equals val, the returned length is zero.
Repeated values that are retained are copied just like any other nonmatching value.

## Common mistakes

- Incrementing the write pointer for removed values leaves gaps in the prefix.
- Returning the number of skipped values reverses the required meaning.
- Requiring the suffix to be sorted is unnecessary because only the prefix is judged.
- Removing from the list while iterating can skip adjacent matches.

## Language notes

Python and Java both use one pass and overwrite the input array in place.
The Java method preserves the required removeElement signature.
No extra collection is needed because the judge compares only the prefix of the original array.
