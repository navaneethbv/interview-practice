## Intuition

An unknown length prevents initializing an ordinary binary search, but an exponentially growing probe finds a sufficiently large upper bound quickly.
The past-the-end sentinel behaves like a value larger than every allowed target.
After bracketing the target position, perform a lower-bound search to handle duplicates correctly.

## Brute force

Read indices in order until reaching the target or a larger value.
A distant target requires linear reader calls, defeating the purpose of accessing a huge external array sparingly.

## Approach

Start `bound` at one and inspect index `bound - 1`.
While that value is smaller than target, double the bound.
The first non-smaller probe bounds the target's earliest possible position above, while the preceding probe excludes the lower prefix.
Search from `bound // 2` through `bound - 1`.
If a midpoint value is smaller, move low past it; otherwise move high to that midpoint.
When the bounds meet, verify equality and return the index or -1.
Keeping equality in the upper half preserves the first matching occurrence.

## Walkthrough

Example 1 searches for 5 in `[1, 3, 5, 7, 9]`.
Probes at indices zero and one find 1 and 3, so the bound grows to four.
Index three contains 7, establishing the search interval from two through three.
The midpoint at two contains 5, moving high to two.
The final equality check returns index 2.

## Complexity

If p is the first index whose value or sentinel is at least target, the number of reads is O(log(p + 2)).
Both implementations use O(1) auxiliary space.
For an absent target beyond all values, this becomes O(log(n + 2)) reads for length n.

## Edge cases

An empty reader immediately returns its sentinel and leads to -1.
A target at index zero requires no bound expansion.

## Common mistakes

Do not return the first equal midpoint encountered, since duplicates require the smallest index.
Never use the unavailable length API.

## Language notes

Python receives infinity past the end; Java receives `Integer.MAX_VALUE`.
Allowed targets are smaller than both sentinels, so sentinel equality cannot masquerade as a real match.
