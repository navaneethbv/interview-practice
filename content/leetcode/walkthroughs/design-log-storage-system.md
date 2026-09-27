## Intuition
Timestamps use fixed-width fields ordered from year to second.
Truncating every timestamp at the requested granularity turns a range query into a lexicographic prefix comparison.

## Brute force
A naive query could parse every timestamp into separate fields and compare fields one at a time.
That remains O(L) per stored log for timestamp length L, but creates many temporary arrays.
The prefix representation is shorter and preserves chronological order.

## Approach
1. Store each id and its timestamp in insertion order.
2. Map each granularity to its prefix length.
3. Truncate start, end, and each stored timestamp to that length.
4. Include ids whose prefixes lie inclusively between the bounds.

## Walkthrough
Example 1 stores id 1 at `2017:01:01:01:00:00` and id 2 at the next day.
The query uses Day granularity, so each timestamp is truncated to ten characters.
The start and end prefix are both `2017:01:01`.
Id 1 has that prefix and is included.
Id 2 has prefix `2017:01:02` and is excluded.
The returned list is `[1]`, preserving insertion order.

## Complexity
For P stored logs and timestamp length L, a retrieval scans in O(PL) character work and creates O(P L) cumulative temporary substring characters during the scan.
The returned list uses O(R) space for R matching ids.
Each put stores O(L) timestamp content.

## Edge cases
Equal start and end prefixes include matching logs.
Granularity Year compares only the first four characters.
Logs are returned in insertion order rather than sorted by timestamp.

## Common mistakes
Using an exclusive end bound drops logs exactly at the endpoint.
Comparing untruncated full timestamps applies the wrong granularity.
Sorting results changes the contract's insertion order.

## Language notes
Python slicing creates a prefix string for each comparison.
Java `substring` similarly creates prefix objects under current runtimes, and its parallel id and timestamp lists preserve insertion order.
