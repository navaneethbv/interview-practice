## Intuition

Browser history is an ordered sequence plus a pointer to the current entry.
Moving backward or forward only changes that pointer.
Visiting a new page after going backward discards the former future, then appends a new current entry.

## Brute force

Physically moving entries between separate back and forward stacks also works, but a navigation of s steps can require O(s) transfers.
A sequence and an index jump directly to the requested destination after clamping it to a valid boundary.
The cost of deleting obsolete forward entries is paid only when a new visit occurs.

## Approach

1. Initialize `pages` with the homepage and set `index` to zero.
2. In visit, remove every entry after index, append the new URL, and increment index.
3. In back, set index to the maximum of zero and `index - steps`.
4. In forward, set index to the minimum of the final valid index and `index + steps`.
5. Return `pages[index]` after either navigation operation.

The current entry always exists.
A page may appear more than once in history, because separate visits are separate entries even when their URL strings match.

## Walkthrough

Example 1 starts at `a.com`.

| Operation | pages | index | Returned value |
| --- | --- | ---: | --- |
| visit b.com | [a.com,b.com] | 1 | null |
| visit c.com | [a.com,b.com,c.com] | 2 | null |
| back 1 | [a.com,b.com,c.com] | 1 | b.com |
| visit d.com | [a.com,b.com,d.com] | 2 | null |
| forward 2 | [a.com,b.com,d.com] | 2 | d.com |

The visit to d.com removes c.com permanently from this history.
The final forward call cannot restore that discarded entry.

## Complexity

Back and forward each take O(1) time.
Deleting r forward entries and appending costs O(r + 1) amortized, with occasional dynamic-array resizing.
Across all visits, each entry is added and discarded at most once, so total visit work is linear in the number of visits.
Storage is O(H) URL references for the maximum retained history length H, plus stored URL characters.

## Edge cases

Navigation beyond either boundary stops at that boundary.
A visit from the newest page removes nothing.
A visit from the homepage can discard the entire former forward history.
Repeated visits to the same URL remain distinct entries.

## Common mistakes

- Keeping forward entries after visit allows navigation into an abandoned branch.
- Updating index without clamping can create an invalid array access.
- Deduplicating URLs loses separate visits and changes navigation semantics.

## Language notes

Python deletes a tail slice and appends the new page.
Java removes entries from the ArrayList's end, avoiding shifts of earlier entries.
Java may retain the list's allocated capacity after removals, which is why the storage bound uses maximum history length.
