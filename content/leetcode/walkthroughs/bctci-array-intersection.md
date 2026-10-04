## Intuition

The next shared occurrence must appear at the current position of both sorted streams.
When the values differ, the smaller one cannot match any future value in the other stream and can be discarded.

## Brute force

Comparing every occurrence in one array with every occurrence in the other takes quadratic time and requires care not to reuse matches.
A frequency map would work, but sorted order provides a simpler scan with minimal working state.

## Approach

Maintain indices `i` and `j` into the two arrays.
If their values match, append that value to `common` and advance both indices.
Otherwise advance only the index pointing to the smaller value.
Stop when either array is exhausted.
Every match consumes one occurrence from each input, so a value with frequencies a and b appears exactly `min(a, b)` times.
Appended values are nondecreasing because neither pointer ever moves backward.

## Walkthrough

```text
Input: arr1 = [1, 2, 3], arr2 = [1, 3, 5]
Output: [1, 3]
```

Example 1 begins with 1 in both arrays, so append 1 and advance both pointers.
The current values become 2 and 3; discard the 2 by advancing `i`.
The current values are now both 3, so append 3.
The first array is exhausted, ending the scan with `[1, 3]`.
The remaining 5 has no possible counterpart.

## Complexity

For lengths n and m, time is O(n + m).
Python uses O(1) working space apart from its O(k) result.
Java preallocates a buffer of size `min(n, m)` and then copies its filled prefix, so its allocated space is O(min(n, m)).

## Edge cases

An empty input yields an empty result.
Repeated values must remain repeated up to the smaller frequency.
Disjoint value ranges terminate without matches.

## Common mistakes

Using sets loses multiplicity.
Advancing both pointers after unequal values may skip a later valid match.

## Language notes

Python appends directly to a list.
Java tracks the filled count separately and returns `Arrays.copyOf(common, count)` to remove unused buffer entries.
