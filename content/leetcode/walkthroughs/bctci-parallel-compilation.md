## Intuition

With unlimited parallel workers, a package waits only for its slowest dependency chain.
Its earliest finish is its own duration plus the latest finish among its prerequisites.
A topological traversal computes these finish times in dependency order.

## Brute force

Simulate compilation second by second while scanning for newly available packages.
This makes running time depend on the potentially large total duration instead of only graph size.

## Approach

Build reverse edges in `dependents` so finishing a package identifies the packages it unblocks.
Set `waiting[package]` to its number of prerequisites and enqueue packages with none.
Maintain `start`, initially zero, for the latest prerequisite completion seen so far.
When processing a package, compute `done = start[package] + seconds[package]` and update overall `finish`.
For each dependent, maximize its start with done and decrement waiting.
Enqueue it only when waiting reaches zero, ensuring all prerequisite finish times have contributed.

## Walkthrough

Example 1 has durations `[10, 20, 30]`, with package 2 importing packages 0 and 1.
Packages 0 and 1 start at time zero and finish at 10 and 20.
Their updates set `start[2]` first to 10 and then to 20.
Once both dependencies are processed, package 2 becomes ready.
It finishes at `20 + 30 = 50`, which is the overall minimum completion time.

## Complexity

For n packages and E dependency entries, graph construction and traversal take O(n + E) time.
Reverse edges, counters, timing arrays, and the queue require O(n + E) space.

## Edge cases

Independent packages compile together, so the result is their maximum duration.
The graph is guaranteed acyclic, ensuring every package eventually becomes ready.

## Common mistakes

Use the maximum prerequisite finish time, not their sum.
Do not start a package after only its first dependency finishes.

## Language notes

Python uses `deque` for ready packages.
Java uses `ArrayDeque`, long timing arrays, and a long result to preserve arithmetic during accumulated dependency chains.
