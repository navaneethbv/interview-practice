## Intuition

Sort intervals by their left endpoint and queries by value.
When processing a query, every interval that could contain it has already entered a min-heap keyed by interval size.
Removing intervals whose right endpoint is behind the query leaves the heap top as the smallest valid interval.

## Brute force

Checking every interval for every query takes O(nq) time.
Sorting and heap filtering avoids revisiting unrelated intervals.

## Approach

1. Sort intervals by left endpoint.
2. Pair each query with its original index and sort those pairs by query value.
3. Add every interval whose left endpoint is at most the current query.
4. Remove heap entries whose right endpoint is smaller than the query.
5. Store the smallest remaining size at the original query index.
6. Return answers in input order.

## Walkthrough

Example 1 uses intervals = [[1, 4], [2, 3], [6, 6]] and queries = [2, 4, 5, 6].
At query 2, both first intervals enter the heap, and [2,3] gives size 2.
At query 4, [2,3] expires, leaving [1,4] with size 4.
At query 5, no active interval remains, so the answer is -1.
At query 6, [6,6] enters and gives size 1.
The answers are [2, 4, -1, 1].

## Complexity

- Time: O((n + q) log(n + q)), for sorting and heap operations.
- Space: O(n + q), for the heap, sorted query indices, and answers.

## Edge cases

An endpoint counts as included because expiration checks right < query.
Duplicate queries are processed independently and retain separate original indices.
Intervals that start later wait until their left endpoint reaches the query.
No active interval leaves the initialized answer -1.

## Common mistakes

- Sorting queries without preserving their original indices scrambles output.
- Removing intervals only when they are popped can leave stale entries if the heap top is valid.
- Keying the heap by right endpoint returns the wrong interval.
- Using interval size right - left instead of right - left + 1 is off by one.

## Language notes

Python heapq stores tuples ordered by size first.
Java stores interval arrays in a PriorityQueue with a size comparator and uses boxed query indices for sorting.
