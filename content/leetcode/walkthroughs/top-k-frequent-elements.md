## Intuition

A value's frequency is an integer between one and the input length.
Use that bounded range as bucket indices instead of sorting all values by frequency.
Reading buckets from highest frequency downward directly produces the most frequent values.

## Brute force

Count occurrences, then sort the distinct values by their counts.
This takes O(n + u log u) time for n entries and u distinct values.
Frequency buckets avoid the comparison sort and achieve expected linear time.

## Approach

1. Build `counts`, mapping each distinct value to its frequency.
2. Allocate `buckets` for frequencies zero through n.
3. Put each distinct value into the bucket matching its count.
4. Scan buckets backward, appending their values to `result`.
5. Stop once k values have been collected and return them.

All values in a higher bucket occur more often than every value in a lower bucket.
The unique-selected-set guarantee ensures that the cutoff never requires choosing arbitrarily among tied included and excluded values.
Order within the selected set is unrestricted.

## Walkthrough

Example 1 uses `[4, 4, 1, 2, 2, 2]` with k equal to 2.

| Frequency | Bucket contents | Collection result |
| --- | --- | --- |
| 6 through 4 | Empty | `[]` |
| 3 | `[2]` | `[2]` |
| 2 | `[4]` | `[2, 4]`, stop |
| 1 | `[1]` | Not needed |

The counts are 2 appearing three times, 4 twice, and 1 once.
Return `[2, 4]`.

## Complexity

- Time: O(n) expected, including counting, bucket initialization, placement, and the backward scan.
- Space: O(n), for the count map, buckets, and output.

## Edge cases

One distinct value is returned when k is one.
If k equals the number of distinct values, every value is selected.
Negative values are ordinary map keys and do not index the buckets directly.
Multiple selected values may tie with each other without causing ambiguity.

## Common mistakes

- Indexing buckets by the value rather than its frequency fails on negative or large values.
- Allocating only n buckets omits a possible frequency of n.
- Returning all input occurrences instead of distinct keys duplicates selected values.

## Language notes

Python uses `Counter` and extends its result by complete buckets, then takes the first k entries.
Java uses a frequency map, lists of buckets, and a fixed-size `int[]` filled until k values are collected.
Their map iteration order can differ, which is allowed by the unordered-output contract.
