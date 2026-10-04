## Intuition

The relevant category of an IPv4 address is only the text before its first dot.
After counting those categories, the tie rule requires retaining their order of first appearance rather than sorting them numerically or lexicographically.

## Brute force

For each address, rescan all addresses to count its first octet and compare candidates.
This can take O(n squared) work and repeatedly splits or inspects the same address strings.

## Approach

Build an insertion-ordered `counts` map from first-octet strings to frequencies.
Then iterate that map in first-seen order.
Initialize `best` as empty and replace it only when a candidate's count is strictly greater than the current best count.
Equal frequencies leave the earlier octet selected.
Because counting is complete before selection, a temporarily frequent octet cannot win merely by leading midway through the input.

## Walkthrough

Example 1 contains first octets `203, 208, 202, 203`.
Counting produces 203 with frequency two, then 208 and 202 with frequency one each.
The selection pass first chooses 203.
Neither later entry has a greater count, so it remains selected.
The returned value is the string `"203"`, not an entire IP address or a numeric octet.

## Complexity

Expected time is O(n) because valid IPv4 strings have bounded length.
The map uses O(u) space for u distinct first octets, bounded by the IPv4 category range for canonical addresses.

## Edge cases

Empty input returns `""`.
If all first octets are different, the first address determines the winner.
Distinct full addresses can still share an octet and must each contribute a count.

## Common mistakes

A regular Java hash map does not promise first-appearance iteration order.
Updating best on equal counts would prefer the last tied category instead.

## Language notes

Python dictionaries preserve insertion order.
Java explicitly uses `LinkedHashMap` and extracts the prefix with `substring` and the first dot position instead of splitting the complete address.
