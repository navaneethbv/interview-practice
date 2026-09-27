## Intuition
Keys with equal counts can share one bucket in a doubly linked list ordered by count.
A map from key to bucket makes each update jump directly to its neighboring count, while an insertion-ordered key set exposes one key immediately.

## Brute force
A map from key to count plus a scan of every key for each minimum or maximum query is simple.
Each query costs O(K) for K keys, and updates are O(1).
Repeated queries make that approach slow when the key set is large.

## Approach
1. Link sentinel buckets at counts zero on both ends.
2. Store every key in the bucket for its current count.
3. On `inc` or `dec`, move the key to an adjacent bucket, creating that bucket if needed.
4. Remove empty buckets and read any key from the first or last real bucket.

## Walkthrough
Example 1 increments `a` twice and `b` once.
The first increment creates the count 1 bucket and places `a` there.
The second increment creates count 2, moves `a`, and removes the empty count 1 bucket.
Incrementing `b` creates a count 1 bucket before `a`'s count 2 bucket.
`getMaxKey` reads `a` from the tail-adjacent count 2 bucket.
`getMinKey` reads `b` from the head-adjacent count 1 bucket.
The returned values are therefore `a` and `b`.

## Complexity
Each update and each min or max query is O(1) time.
The linked buckets, key map, and key sets use O(K) space for K distinct live keys.
Hash-table updates and first-key retrieval are expected O(1) under the local hash-table assumptions.
The validator allows any key in a tied bucket, so set iteration is sufficient.

## Edge cases
Decrementing a count-one key removes it entirely.
An empty structure returns the empty string for both queries.
Tied counts may return any member of the tied bucket.

## Common mistakes
Scanning all keys on every query defeats the data structure's purpose.
Leaving an empty bucket linked can break neighbor selection.
Moving a key without updating the map makes later operations use stale counts.

## Language notes
Python uses sentinel `Bucket` objects and set membership.
Java keeps the same structure with a private nested bucket class and harness supplied collection imports.
