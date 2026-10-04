## Intuition

Two users are suspicious when their IP sets match, regardless of the order in which the IPs are listed.
Sorting each user's IPs creates a canonical representation: equal sets produce equal sorted sequences.
A set of previously seen representations then detects the first duplicate.

## Brute force

Compare every pair of users and check whether their IP collections match.
This requires quadratic user-pair comparisons even when most users have unrelated addresses.

## Approach

Ignore the username and copy the IP portion of each record.
Sort that copy and use its ordered contents as `key`.
If the key already exists in `seen`, return true immediately.
Otherwise insert it and continue.
If every user has a different key, return false.
The contract guarantees distinct IPs within one user's record, so sorting is sufficient without an additional per-user deduplication step.
The representation must remain unchanged after insertion into the hash set, because mutation could invalidate lookup behavior.

## Walkthrough

Example 1 first records mike's pair of addresses as one sorted key.
Bob's addresses produce a different key and are inserted separately.
Bob2 lists the same two addresses as bob in the opposite order.
Sorting bob2's IP portion produces bob's existing key, so the membership check succeeds and returns true.
The usernames themselves intentionally do not participate in that comparison.

## Complexity

For u users with at most k IPs each, expected runtime is O(u times k log k), including sorting and hashing each key.
Stored keys use O(u times k) space.
Here k is at most ten and IPv4 strings have bounded length, making both bounds effectively linear in users.

## Edge cases

Zero or one user cannot form a suspicious pair.
Sharing only some addresses does not qualify; the whole set must match.

## Common mistakes

Comparing the original lists would mistake reordered identical sets for different users.
Including the username prevents duplicates from ever matching correctly.

## Language notes

Python converts the sorted IP list to an immutable tuple.
Java inserts a sorted `ArrayList` into a `HashSet` and never changes that list afterward, relying on content-based equality.
