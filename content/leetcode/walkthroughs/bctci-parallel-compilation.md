## Intuition

Unlimited parallel workers remove competition for computing resources.
A package waits only for its slowest prerequisite chain, so its earliest finish is its own duration plus the largest prerequisite finish time.
The overall answer is the latest finish across all packages.

## Brute force

Enumerate dependency paths and sum their durations to find the longest.
A directed acyclic graph can contain exponentially many paths, even though many share the same suffixes.

## Approach

Reverse the dependency information into `dependents`, listing which packages each completed package unlocks.
Store each package's unresolved prerequisite count in `waiting`.
Enqueue every package with no prerequisites and initialize all earliest starts to zero.
When a package leaves the queue, calculate `done = start[package] + seconds[package]`.
Update the global finish time and propagate `done` as a candidate start for each dependent.
Decrease that dependent's waiting count and enqueue it only when all prerequisites are processed.
At that moment its stored start is the maximum of all prerequisite finish times.
The acyclic-input guarantee ensures every package eventually becomes ready.

## Walkthrough

Example 1 has independent packages 0 and 1 taking 10 and 20 seconds.
Both start at time zero and finish at 10 and 20 respectively.
Package 2 imports both, so processing package 0 suggests start 10, then processing package 1 raises it to 20.
After the second prerequisite finishes, package 2 becomes ready and takes another 30 seconds.
The final completion time is 50.

## Complexity

For n packages and e dependency entries, both references take O(n + e) time.
The reverse adjacency lists, counters, start times, and queue require O(n + e) space.

## Edge cases

With no imports, the answer is the longest individual compilation time.
A dependency chain has no useful parallelism and its durations add together.

## Common mistakes

Sum a package's own duration with the maximum prerequisite finish, not the sum of prerequisite durations.
Queue readiness concerns dependency completion, not package index order.

## Language notes

Python uses `deque` and arbitrary-precision totals.
Java uses `ArrayDeque` and `long` start/finish values to keep accumulated durations safe.
