## Intuition

Meetings prefer the lowest numbered free room.
If all rooms are occupied, the meeting waits for the earliest finishing room, with room number breaking ties.

## Brute force

Checking every room for every meeting can take O(mn) time.
Repeatedly scanning occupied rooms ignores that two heaps maintain both needed orders.

## Approach

1. Sort meetings by start time.
2. Store free room numbers in a min heap and busy pairs by finish time then room number.
3. Release every room finished by the next start.
4. Assign a free room or delay the meeting on the earliest busy room, then count the booking.

## Walkthrough

Example 1:

For n 2 and meetings [0,10], [1,5], [2,7], [3,4], room 0 takes the first meeting.
Room 1 takes the second meeting.
The third waits for room 1, which finishes at time 5, so it runs from time 5 to 10.
The fourth starts at time 10 and both rooms are available, so it takes room 0.
Rooms 0 and 1 each receive two bookings, and the tie returns room 0.

## Complexity

Sorting takes O(m log m), and every heap operation costs O(log n).
Total time is O(m log m + m log n), with O(m+n) total auxiliary storage because Python sorted copies meetings and Java object sorting may use temporary storage.
Java uses long finish times to avoid overflow when meetings are delayed.

## Edge cases

Free rooms are released when finish equals the next start.
Equal finish times choose the smaller room number.
Equal booking counts return the smallest room because the final scan updates only on a strict increase.

## Common mistakes

Do not choose an arbitrary free room.
Do not delay from the latest finishing room.
Use original meeting duration when computing a delayed finish.

## Language notes

Python heap tuples compare finish or room naturally.
Java supplies both comparisons explicitly in its priority queue comparator.
