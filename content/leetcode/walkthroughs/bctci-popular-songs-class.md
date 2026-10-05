## Intuition

A song is popular when its play count is strictly above the median of all registered counts.
Two heaps maintain the lower half and upper half so the middle values are always available.
The lower heap is a max heap and the upper heap is a min heap.

## Brute force

Sorting all registered counts during every query costs O(m log m) for m songs.
Maintaining the two halves incrementally makes each registration logarithmic and each popularity check constant time.

## Approach

1. Store each title's count in `plays`.
2. Push every new count into `lower`, move its largest value to `upper`, and move one value back if the upper half becomes larger.
3. The lower heap has one extra value for odd sizes, or both heaps have equal size for even sizes.
4. Compare twice the title count with twice the median to avoid floating point arithmetic.

## Walkthrough

Example 1 registers `a` with 193, so the single median is 193 and `a` is not strictly above it.
After registering 140 and 132, the sorted counts are 132, 140, 193.
The lower heap exposes 140 as the median, making 193 popular while 140 is not.
The heap sizes and roots encode this result without sorting again.

## Complexity

- Time: `register_plays` is O(log m), and `is_popular` is O(1).
- Space: O(m) for the title map and the two heaps.

## Edge cases

With one song, its own count equals the median and is not popular.
For an even number of songs, the doubled median is the sum of the two middle counts.
Equal play counts are handled naturally by heap ordering.
The contract registers each title once, so no update or removal path is required.

## Common mistakes

- Using greater than or equal incorrectly marks the median itself as popular.
- Averaging with floating point can lose precision for large counts.
- Letting the upper heap contain more values breaks median selection.
- Forgetting to store titles makes later queries unable to retrieve their counts.

## Language notes

Python negates values to use `heapq` as a max heap for `lower`.
Java supplies `Collections.reverseOrder()` and uses `long` for doubled counts.
Both implementations keep the same heap invariant after every registration.
