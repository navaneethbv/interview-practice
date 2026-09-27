## Intuition

The largest square must come from one of the two ends of a nondecreasing array.
The left end can have a large negative magnitude, while the right end can have a large positive magnitude.
Fill the output from right to left by taking the larger absolute value at each step.

## Brute force

A simple solution could square every value and sort the resulting list.
That takes O(n log n) time after O(n) squaring and uses O(n) output space.
The two-pointer method uses the sorted input property to avoid that sort and runs in linear time.

## Approach

1. Place left at the first element and right at the last element.
2. Compare the absolute values at those pointers.
3. Write the larger square into the final unused output position.
4. Move the pointer that supplied the square.
5. Continue until every output slot has been filled.

## Walkthrough

Example 1 is [-4, -1, 0, 3, 10].
The first comparison is between 4 and 10, so 100 goes at the last position and right moves to 3.
The next comparison is between 4 and 3, so 16 goes before 100 and left moves to -1.
The remaining comparisons place 9, then 1, then 0 into the earlier slots.
The final sorted squares are [0, 1, 9, 16, 100].

## Complexity

For n values, every pointer moves only toward the center, so the time complexity is O(n).
The returned array uses O(n) space as required output.
The algorithm uses O(1) auxiliary variables in both references besides that returned array.
No sorting workspace is needed.

## Edge cases

An all-negative input is processed by repeatedly taking values from the left.
An all-nonnegative input is already ordered by square and is taken from the right.
Equal absolute values can be taken from either side without changing the sorted result.
An empty input returns an empty output array under the loop contract.

## Common mistakes

- Filling from left to right puts large squares in the wrong positions.
- Comparing signed values instead of absolute values misses large negative magnitudes.
- Moving the pointer from the smaller square leaves the same candidate to be compared again.
- Sorting the original array first is unnecessary and can violate input expectations.

## Language notes

Python multiplies integers directly and builds a list of the exact output length.
Java uses Math.abs and an int array, matching the judge's integer range.
Both versions keep the input array unchanged.
