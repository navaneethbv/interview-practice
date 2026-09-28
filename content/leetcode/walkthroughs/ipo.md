## Intuition

At each project selection, every currently affordable project competes by profit.
Sorting projects by required capital and using a max heap chooses the largest available profit while advancing the affordability pointer once.

## Brute force

Trying every project ordering is factorial.
The heap keeps only the best choice among projects that are currently legal.

## Approach

1. Sort `(capital, profit)` pairs by capital.
2. Add every newly affordable project to a max heap.
3. Select the highest profit up to k times and increase w.
4. Stop early if the heap is empty.

## Walkthrough

For Example 1, capital 0 allows project 0 with profit 1, raising w to 1.
Projects 1 and 2 then become affordable, and the max heap chooses profit 3.
Final capital is 4.

## Complexity

Sorting n projects costs O(n log n), and each project enters and leaves the heap once, for O((n+k) log n) time.
Python stores sorted tuples and a heap of negated profits, using O(n) space.
Java stores an O(n) pair array and a `PriorityQueue<Integer>`.

## Edge cases

If no project is initially affordable, return the starting capital.
Zero-profit projects can still unlock no additional capital and may be selected only within the k limit.
At most k projects are selected, with no reuse.

## Common mistakes

Add all affordable projects before selecting the maximum.
Do not remove capital requirements from w.
Do not sort the heap by required capital after insertion.

## Language notes

Python negates profits because `heapq` is a min heap.
Java's priority queue uses reverse order directly.
