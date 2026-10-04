## Intuition

An element smaller than a value already seen belongs inside the unsorted region.
The last such element determines the right boundary.
Symmetrically, scanning from the right finds elements larger than a later value, and the earliest such element determines the left boundary.

## Brute force

Sort a copy and compare it with the original to find the first and last mismatching positions.
That takes O(n log n) time and O(n) space, while running extrema identify the same boundaries directly.

## Approach

Scan left to right with `running_max`.
Whenever the current value is below that maximum, update `end` to the current index.
If no violation occurs, return `[-1, -1]`.
Then scan right to left with `running_min`, updating `start` whenever the current value exceeds the minimum to its right.
Return both indices.
Elements outside these boundaries are already correctly ordered relative to every element they must precede or follow.

## Walkthrough

Example 1 reaches running maximum 11 before encountering 7 at index 6, setting an initial right boundary.
Later 6 and 7 below running maximum 12 extend `end` to index 9.
The reverse scan finds values above a later minimum, ultimately extending `start` to index 3, whose value is 7.
Sorting indices 3 through 9 places that region between the prefix ending in 4 and the suffix beginning in 16.
Return `[3, 9]`.

## Complexity

Two scans take O(n) time and require O(1) auxiliary space.
The reference returns boundaries without sorting or modifying the input.

## Edge cases

An already sorted array returns two -1 values.
Equal adjacent values are allowed in sorted order.
Descending input generally requires sorting the entire array.

## Common mistakes

Using non-strict comparisons marks equal values as violations unnecessarily.
Stopping at the first local inversion misses later values that extend the required interval.

## Language notes

Python initializes extrema with infinities.
Java uses long extrema beyond the int range, ensuring even extreme integer inputs are compared correctly before any running value has been observed.
