## Intuition

The sum between two positions is the difference of their prefix sums.
For a current prefix total, finding an earlier prefix equal to `prefix - k` identifies a subarray summing to k.
The earliest such prefix gives the longest possible interval ending here.

## Brute force

Try every start and extend every end with a running sum.
This takes O(n squared) time.
A standard positive-number sliding window is unsuitable because negative values can increase or decrease sums unpredictably.

## Approach

Initialize `first = {0: -1}` to represent the empty prefix before the array.
Accumulate `prefix` as each value arrives.
Before storing the current prefix, look up `prefix - k`; if present, update `best` with the index difference.
Use `setdefault` to store only the first occurrence of a prefix sum.
Keeping earliest indices maximizes future lengths, and querying before insertion avoids inventing a zero-length subarray.

## Walkthrough

Example 1 uses `[1, 2, 3, 2, 1]` and k three.
The first two values produce prefix three, matched with the initial zero at -1, yielding length two.
The next value alone also sums to three, but gives only length one.
At the last index, prefix nine matches earlier prefix six at index two, again giving length two.
The answer is 2.

## Complexity

Expected time is O(n) and auxiliary space is O(n) for distinct prefix totals.
Hash-table lookup avoids scanning earlier positions on every iteration.

## Edge cases

Empty input returns -1.
A valid zero-sum subarray must contain at least one value.
Repeated prefix sums are especially useful when zeros or cancelling positive and negative values occur.

## Common mistakes

Do not overwrite earliest positions or initialize best to zero when the required no-solution result is -1.

## Language notes

Python integer sums need no explicit widening.
Java uses `long` prefix values and `Map<Long, Integer>`, while stored positions and returned lengths remain integers.
