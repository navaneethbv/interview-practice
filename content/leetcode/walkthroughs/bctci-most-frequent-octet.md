## Intuition

Only the substring before the first dot identifies the group being counted.
The complete addresses are distinct, but many can share that first octet.
Counting those groups is enough; their first encounter order resolves ties without sorting.

## Brute force

For each address's first octet, scan every address again to count matches.
That repeats counting for popular octets and can take quadratic time in the number of addresses.

## Approach

Extract each first octet and increment its frequency in `counts`.
Preserve insertion order so groups are later visited in the order they first appeared in `ips`.
After all frequencies are final, scan the map entries.
Replace `best` only when there is no current winner or the new group has a strictly larger count.
A tied later group cannot replace the earlier group, giving exactly the requested tie rule.
Computing final frequencies before selecting the winner also avoids confusing a temporary lead with the earliest occurrence among final tied groups.

## Walkthrough

Example 1 encounters octets 203, 208, 202, then 203 again.
The ordered map has counts `203: 2`, `208: 1`, and `202: 1`.
The scan first chooses 203 and neither later entry exceeds its count.
The returned string is `203`, retaining its textual form rather than converting the answer to an integer.

## Complexity

With valid IPv4 strings of bounded length, both references run in O(n) time.
There are at most 256 possible first-octet groups, so the counting map is bounded by O(256) space, or O(u) when expressed in terms of distinct observed octets.
The returned string is one stored key.

## Edge cases

Empty input leaves `best` as the empty string.
If all observed octets have equal counts, the one from the first address wins.

## Common mistakes

An unordered map iteration cannot by itself guarantee the tie rule.
Do not count complete addresses or all four octets together.

## Language notes

Python dictionaries preserve insertion order and `split` extracts the first component.
Java explicitly uses `LinkedHashMap` and obtains the substring ending at the first dot.
