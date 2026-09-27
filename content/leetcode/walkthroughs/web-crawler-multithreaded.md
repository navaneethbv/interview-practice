## Intuition

Pages and links form a directed graph, and crawling is a reachability traversal restricted to one hostname.
A URL must be claimed before it is scheduled, so cycles and duplicate links never cause duplicate fetches.
Java can fetch a frontier concurrently while one coordinating thread owns all discovery state.

## Brute force

Following every link recursively without a visited set repeats work and can loop forever on cycles.
Even with visited state, comparing raw URL prefixes can admit a different hostname with a similar spelling.
A parsed hostname and a visited set address these separate correctness problems.

## Approach

1. Parse the starting hostname and place `startUrl` in `seen` and the initial pending work.
2. Fetch outgoing links only for already claimed, same-host pages.
3. Parse each linked hostname and add previously unseen matching URLs to the next work.
4. Continue until no qualifying page remains.
5. In Java, `submitLevel` creates futures for one frontier and `collectNext` processes their results before the next frontier starts.

Only the coordinating thread accesses Java's HashSet, so it does not need concurrent mutation support.
Workers only invoke the parser.
Python uses a sequential growing list because the browser runtime does not support operating-system threads.

## Walkthrough

Example 1 starts at page `/a` on `site.test`.
Its outgoing links lead to `/b` on the same host and `/c` on `other.test`.

| Fetched page | Link considered | Decision |
| --- | --- | --- |
| site.test/a | site.test/b | claim and schedule |
| site.test/a | other.test/c | exclude different host |
| site.test/b | site.test/a | skip already seen |

The returned pages are the original full URLs for `/a` and `/b`.
Their order is unrestricted, and the link back to `/a` does not trigger another fetch.

## Complexity

For V reached pages, E inspected links, and maximum URL length L, expected total work is O((V + E)L), including parsing and hashing.
Java buffers frontier results, so O(V + E + L) auxiliary space is a safe bound excluding input URL storage.
Python uses O(V + D + L) auxiliary space, where D is the largest fetched adjacency list.
Four workers do not change asymptotic work or guarantee a speedup.

## Edge cases

A page without links still appears in the result.
Self-links, cycles, and repeated links are filtered by seen.
Different paths on the same host remain eligible.
Foreign-host pages are never fetched.

## Common mistakes

- Claiming after fetching allows duplicate scheduling.
- Comparing URL prefixes confuses similar hostnames.
- Allowing worker threads to mutate an ordinary shared set introduces races.

## Language notes

Java preserves the interruption flag and wraps worker failures with their causes, then shuts down the executor in finally.
Python uses urlsplit; Java uses URI hostname parsing.
The local parser is an in-memory fixture, and the judge validates reachable results rather than parallel performance.
