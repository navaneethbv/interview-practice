## Intuition

Sort friendship events by time and join their people with disjoint set union.
The first event that reduces the number of components to one is the earliest complete connection.

## Brute force

Rebuilding reachability after each log can repeatedly traverse the same graph.
That approach can take O(L times n) time and does not need to be repeated when connectivity is permanent.

## Approach

1. Sort logs by timestamp.
2. Initialize one component per person.
3. Union the two people in each event, using path compression and union by size.
4. Return the timestamp when one component remains, or -1 if logs end first.

## Walkthrough

Example 1:

For logs [1,0,1], [3,1,2], [2,2,3] and n 4, time 1 joins 0 with 1.
Time 2 joins 2 with 3, leaving two components.
Time 3 joins those components, so the earliest complete timestamp is 3.

## Complexity

Sorting takes O(L log L) time.
Python's union by size with path compression takes O(L alpha(n)) additional work, while the Java reference uses path compression without size ranking and has a safe O(L log n) bound.
Python sorted creates an O(L) copied list, while Java Arrays.sort reorders the log array in place but may use O(L) temporary storage for object comparisons.
Parent arrays and component metadata use O(n) space.

## Edge cases

Repeated events within an existing component do not change the component count.
The stated lower bound n at least 2 means every valid input needs at least one union.
If no event connects all people, return -1.

## Common mistakes

Do not process logs in input order when timestamps are unsorted.
Do not decrement the component count when both roots are already equal.
Path compression must update parent links to the root.

## Language notes

Python finds roots with an inner iterative closure and unions by component size.
Java uses a helper method and parent links; its implementation keeps the expected harness imports available.
