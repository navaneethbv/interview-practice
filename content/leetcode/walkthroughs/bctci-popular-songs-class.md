## Intuition

Popularity depends on the current median, which changes as songs are registered.
Two heaps maintain the lower and upper halves of all play counts, exposing the middle values without sorting the entire collection after every insertion.
A separate map connects each title to its count.

## Brute force

Sort all registered counts for every popularity query and compare the requested song with the resulting median.
This can require O(n log n) work per query.

## Approach

Keep `lower` as a max-heap and `upper` as a min-heap.
Insert a new count into lower, move lower's maximum to upper, then move upper's minimum back if upper became larger.
These operations preserve ordering between halves and ensure lower has either the same size as upper or one extra entry.
For an odd count, lower's root is the median.
For an even count, the median is the average of both roots.
Compare doubled song counts with a doubled median to avoid fractional arithmetic.
Use a strict greater-than comparison because a song equal to the median is not popular.

## Walkthrough

Example 1 first registers a with 193 plays.
Its count equals the sole median, so querying a returns false.
After registering b with 140 and c with 132, the ordered counts are 132, 140, and 193.
The median becomes 140.
Song a is now popular because 193 exceeds 140, while b remains not popular because it equals the median.

## Complexity

Registration performs a constant number of heap operations and costs O(log n).
A popularity query uses map lookup and heap roots, giving expected O(1) time.
The map and heaps together use O(n) space.

## Edge cases

Two unequal counts make only the larger song popular.
Equal counts never become popular merely because of their heap placement.

## Common mistakes

Do not use integer division to approximate an even-sized median.
Preserve both heap ordering and the size invariant after insertion.

## Language notes

Python negates lower-half values to implement a max-heap.
Java uses a reverse comparator and performs doubled arithmetic with `long`.
