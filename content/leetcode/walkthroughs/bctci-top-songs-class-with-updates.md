## Intuition

A song outside the current leaders can become competitive after another registration.
Retain authoritative totals for every song and allow older heap entries to become stale instead of trying to update arbitrary heap positions.

## Brute force

Sorting all song totals on every query is straightforward but repeats ranking work.
Lazy heap updates make registration cheap and defer removal of obsolete entries until they reach the top.

## Approach

Add plays to `totals[title]` and push a new entry ordered by descending total and ascending title.
During top_k, pop entries until k distinct current songs are found or the heap empties.
Discard entries whose stored total differs from the authoritative total, and skip titles already selected.
Save valid entries in kept and reinsert them before returning, so queries do not remove current rankings.
The heap's best-first order ensures valid songs are returned in the required ranking order.

## Walkthrough

```text
Input: ctor = [2], ops = ["register_plays", "register_plays", "register_plays", "register_plays", "top_k"], args = [["a", 5], ["b", 7], ["a", 4], ["c", 8], []]
Output: [null, null, null, null, ["a", "c"]]
```

Example 1 records a at 5 and b at 7.
The second a registration raises its total to 9 and pushes a new entry, leaving the old 5-play entry stale.
Registering c at 8 places it between current a and b.
The two-song query returns `[a, c]` and reinserts their valid entries for future queries.

## Complexity

With H heap entries, registration takes O(log(H + 1)).
A query popping P entries costs O(P log(H + 1) + Pk) conservatively because selected-title membership uses a list.
Reinserting at most k entries adds O(k log(H + 1)).
Storage grows with registrations, not just distinct songs, because stale entries may remain buried.

## Edge cases

Repeated queries without updates preserve rankings.
An empty structure returns an empty list.
Equal totals are ordered alphabetically.

## Common mistakes

Do not treat every heap entry as current.
Do not permanently remove the valid entries selected by a query.

## Language notes

Python uses negative totals in heap tuples.
Java uses an explicit comparator and long totals; both check the totals map and suppress duplicate titles within a query.
