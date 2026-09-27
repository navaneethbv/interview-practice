## Intuition
After removing a subarray, the prefix before it and suffix after it must each be strictly increasing.
The prefix can be fixed from the left, while a suffix can be moved from the right until its first element is compatible with that prefix.
This counts valid removals without testing every pair of endpoints.

## Brute force
For every nonempty interval, concatenate the remaining prefix and suffix and scan it for strict increase.
There are O(N squared) intervals, and each check can cost O(N), giving O(N cubed) time.
The two-pointer count uses each boundary at most a linear number of times.

## Approach
1. Find the longest strictly increasing prefix ending at `left`.
2. If the entire array is increasing, every nonempty subarray is valid, giving `N(N+1)/2`.
3. Start with removals that leave only the valid prefix or an empty suffix.
4. Move `right` left through increasing suffixes, moving `left` left until `nums[left] < nums[right]`.
5. Add `left + 2`, representing all compatible prefix endpoints and the empty prefix.

## Walkthrough
Example 1 is `[1, 2, 3]`, already strictly increasing.
The initial prefix reaches index 2, so the special case applies.
The triangular count is `3 + 2 + 1 = 6`, covering every possible nonempty removal interval.
Those are exactly all six nonempty intervals, and removing any one leaves an increasing remainder.

## Complexity
The prefix scan and the two-pointer suffix scan each move monotonically, so time is O(N).
The method uses O(1) extra space.

## Edge cases
Removing the whole array is valid because an empty remainder is increasing.
Equal adjacent values break strict increase and cannot be retained together.
A single-element array has one removable interval.

## Common mistakes
Using nondecreasing comparisons accepts equal retained values incorrectly.
Forgetting the empty prefix or suffix loses endpoint removals.
Counting only distinct value ranges instead of index intervals undercounts duplicates.

## Language notes
Python returns an arbitrary precision integer for the triangular count.
Java returns `int` for this version, and `N <= 50` keeps that result within range.
Both references maintain the same moving prefix and suffix boundaries.
