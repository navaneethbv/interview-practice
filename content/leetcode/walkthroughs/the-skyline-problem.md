## Intuition

At each building boundary, the skyline height is the tallest building still active.
A max heap stores active heights and their right endpoints.
When buildings start or expire, the top heap height is the next skyline level.

## Brute force

A direct method could inspect every building at every distinct x coordinate.
With B buildings and E boundaries, that costs O(BE) time.
The heap removes expired buildings lazily and keeps the tallest active building accessible.

## Approach

1. Sort buildings by left edge and collect all distinct left and right positions.
2. Add every building starting at the current position to the max heap.
3. Remove expired heap entries from the heap top while their right edge is at or before the current position.
4. Read the tallest active height.
5. Append a key point only when this height differs from the previous skyline height.

## Walkthrough

Example 1 contains [1,3,2] and [2,4,3].
At position 1, height 2 starts, so the skyline begins [1,2].
At position 2, height 3 starts and becomes the active maximum, producing [2,3].
At position 3, the first building expires but height 3 remains until position 4.
The final expiration returns height 0, producing [4,0].

## Complexity

Let B be the building count and E the number of distinct boundaries.
Sorting positions and buildings costs O(B log B), while heap operations cost O(B log B) in total.
The output contains K key points and uses O(K) space.
The heap, sorted events, and position set use O(B) auxiliary space.
An expired building buried below a taller active heap entry is removed later when it reaches the heap top.

## Edge cases

Adjacent buildings with equal heights should not create a false dip.
Overlapping buildings keep the tallest active height.
A building ending at x is expired before the height at x is emitted.
The empty input returns an empty skyline.

## Common mistakes

- Keeping a building whose right edge equals the current position creates a shadow after it ends.
- Emitting every event rather than only height changes creates redundant key points.
- Treating the heap as a min heap selects the shortest building.
- Assuming input buildings are already ordered hides the need for sorting.

## Language notes

Python uses a max heap through negative heights and removes expired entries lazily only when they reach the top.
Java uses TreeMaps of event changes and active height counts.
Both references preserve simultaneous start and end events at one x coordinate.
