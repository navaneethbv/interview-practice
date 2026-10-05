## Intuition

Unlike a set, a multiset retains multiplicity.
The custom hash table stores one key entry whose value list contains one marker per copy, while `total` records the number of copies across all keys.

## Brute force

Storing all copies in a single unsorted array makes membership and removal require global scans.
Hash buckets restrict searches to candidate keys, and each key's marker list permits removing one copy from its end.

## Approach

`add` retrieves the key's `values`, appends a marker, saves the entry with `put`, and increments `total`.
`remove` pops one marker if present and decrements total.
When the list empties, remove the key entry entirely.
Membership tests whether its list is nonempty.

## Walkthrough

Example 1 begins at size zero and adds key 3 twice.
Membership is true after both additions, while size becomes two.
The first removal leaves one marker, so membership remains true and size becomes one.
The second removes the key entirely; subsequent missing removals leave size zero.

## Complexity

With well distributed keys, basic operations are expected amortized O(1), including marker list growth and bucket resizing.
Heavy collisions can make key lookup linear in the number of distinct keys.
Storage follows peak allocated bucket and marker capacity, bounded by peak total copies.

## Edge cases

Repeated copies of the same key increase public size without increasing distinct bucket entry count.
Negative keys are valid.
Removing a missing key changes nothing.
A key can be reinserted normally after its last copy is removed.

## Common mistakes

Do not return `table.count` from size, because that counts distinct keys rather than copies.
Do not remove the whole key when only one of several copies was requested.
Never decrement total for an unsuccessful removal.

## Language notes

Python uses modulo bucket indexing and a mutable list returned by `get`.
Java uses `Math.floorMod` and mutable `ArrayList` values.
Both retain the same marker list inside an entry, so popping it updates the stored multiplicity directly.
