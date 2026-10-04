## Intuition

A valley decreases until its minimum and increases afterward.
At a midpoint, comparing arr[mid] with arr[mid + 1] tells which side contains the bottom.
An increasing step means the bottom is at or left of mid, while a decreasing step means it is to the right.

## Brute force

Scanning the array and taking its minimum is correct but takes O(n) time.
The required logarithmic result comes from discarding half of the remaining candidates at each comparison.

## Approach

Keep low and high as an inclusive candidate interval.
Choose mid between them.
If arr[mid] is less than arr[mid + 1], set high to mid because the increasing suffix has started at or before that point.
Otherwise set low to mid plus one because the sequence is still descending through mid.
When the pointers meet, arr[low] is the valley bottom.

## Walkthrough

In Example 1, the first midpoint is index 2 with value 4, and 4 is less than 7, so high becomes 2.
The next midpoint is index 1 with value 5, and 5 is not less than 4, so low becomes 2.
Both pointers now identify value 4.

## Complexity

The candidate interval is halved on every iteration, so the scan takes O(log n) time.
The algorithm uses O(1) extra space.

## Edge cases

An entirely increasing array returns its first value.
An entirely decreasing array returns its last value.
The two-element cases compare exactly one adjacent pair.
Distinct values guarantee that equality never creates an ambiguous branch.

## Common mistakes

Moving high to mid minus one can discard the bottom when mid itself is the minimum.
Moving low to mid on the descending branch can leave the interval unchanged.
Checking only whether arr[mid] is smaller than its left neighbor changes the boundary logic and can mishandle endpoints.

## Language notes

Python uses integer floor division for the midpoint.
Java uses an unsigned shift to calculate the midpoint without overflow from adding the bounds.
Both return the value at the converged index rather than the index itself.
