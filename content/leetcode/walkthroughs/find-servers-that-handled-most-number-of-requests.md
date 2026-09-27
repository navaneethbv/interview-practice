## Intuition

Each request needs two pieces of state: which servers have finished, and which free server comes first in cyclic order.
A min-heap ordered by finish time releases completed work efficiently.
A separate ordered structure chooses a free server without scanning all k servers.

## Brute force

For every request, scan up to k servers in cyclic order and check their finish times.
For n requests this costs O(nk), which is too expensive when both limits reach 100000.
Ordered free-server state reduces selection and release to logarithmic operations.

## Approach

1. Initialize every server as available and its handled count as zero.
2. Before assigning request index, release every busy server whose finish time is at most the arrival time.
3. Choose the available server at or after `index % k`, wrapping to the smallest server if needed.
4. If none is free, drop the request; otherwise increment its count and record its new finish time in busy.
5. After all requests, return every server whose count equals the maximum.

Java implements cyclic selection with a TreeSet ceiling lookup.
Python instead stores each released server's next absolute turn as `index + (server - index) % k` in a min-heap.
Taking that priority modulo k recovers its server id.
Unselected priorities stay valid: each request removes the smallest available turn, and newly released turns are never earlier than the current index.

## Walkthrough

Example 1 has two servers and requests arriving at one, two, and three, each with load two.

| Request index | Arrival | Released server | Assigned server | counts |
| ---: | ---: | --- | ---: | --- |
| 0 | 1 | none | 0 | [1,0] |
| 1 | 2 | none | 1 | [1,1] |
| 2 | 3 | 0 | 0 | [2,1] |

Server zero finishes exactly when the third request arrives, so it is available.
It has the largest count, and the result is `[0]`.

## Complexity

Time is O((n + k) log(k + 1)), including initialization and at most one assignment and release per accepted request.
Auxiliary space is O(k): each server is either available or busy, and counts has k entries.
The returned list contains at most k ids.

## Edge cases

All-busy requests are dropped without delaying them.
A finish time equal to arrival permits immediate reuse.
Cyclic selection wraps from the highest id to zero.
Tied maximum counts return every tied server.

## Common mistakes

- Releasing only servers finishing strictly before arrival drops valid work.
- Sorting free ids without an efficient successor operation restores linear scans.
- Advancing the preferred server only after accepted requests breaks index-based assignment.

## Language notes

Python integers naturally hold finish-time sums and absolute priorities.
Java widens arrival before adding load and stores heap finish times as long.
The two free-server structures differ, but both implement the same cyclic assignment rule.
