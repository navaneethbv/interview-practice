## Intuition

Each registration changes a song's total, so an old ranking entry becomes stale.
A heap can keep possible rankings, while the totals map tells us whether a popped entry still describes the current song.
This lazy cleanup avoids searching through every song after every update.

## Brute force

Storing totals and sorting every title on every top_k call is simple.
It costs O(d log d) per query for d registered titles, which is wasteful when updates and queries are interleaved.

## Approach

Store each current total in totals and push a heap entry containing negative plays and the title.
The negative value makes Python's min-heap behave like a maximum heap.
Java's comparator orders plays descending and titles alphabetically.
When top_k pops an entry, accept it only if its plays equals totals for that title and the title is not already in the result.
Keep accepted current entries aside and push them back after the query so the heap remains reusable.

## Walkthrough

In Example 1, registering a adds a total of 9, while b and c total 7 and 8.
The current heap entry for a with total 5 is stale and would be rejected if reached.
The valid entry for a is returned first, followed by c because c has the next-highest current total.
The method stops after two accepted titles and restores those entries for later calls.

## Complexity

Let h be the number of heap entries currently stored and k the requested result size.
One registration takes O(log h) time and O(1) new heap space.
One top_k call may inspect O(h) stale entries, costs O(h log h + k squared) in the worst case, and uses O(k) temporary space.
The totals map and heap together use O(d + u) space for d registrations and u distinct titles.

## Edge cases

Calling top_k before any registration returns an empty list.
Repeated registrations create stale entries but only the latest total is accepted.
If fewer than k songs exist, the method returns every current song.
Equal totals are ordered alphabetically by title.

## Common mistakes

Accepting an entry without checking totals returns outdated rankings after an update.
Discarding popped valid entries permanently makes future calls lose songs.
Sorting by title before plays reverses the required priority.

## Language notes

Python stores negative totals and uses result membership to avoid returning a title twice.
Java's Entry record stores positive plays and the comparator performs descending ordering directly.
Both design references restore accepted entries while stale entries are safely removed.
