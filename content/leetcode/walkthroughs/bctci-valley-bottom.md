## Intuition

The slope between adjacent middle values tells which side contains the minimum.
A rising slope means the valley has already been reached by the middle index, while a falling slope means it lies farther right.

## Brute force

A linear minimum scan ignores the required logarithmic-time target.
Sorting is even more expensive and discards the valley structure already provided by the input.

## Approach

Maintain an inclusive interval `[low, high]` containing the minimum.
While low is smaller than high, compare arr[mid] with arr[mid + 1].
If arr[mid] is smaller, keep mid as a possible minimum and set high to mid.
Otherwise the slope is still descending, so set low to mid + 1.
The distinct-value guarantee eliminates flat slopes and their ambiguous direction.
When the bounds meet, return the value at that index.

## Walkthrough

```text
Input: arr = [6, 5, 4, 7, 9]
Output: 4
```

Example 1 starts with indices zero through four and middle index two.
The comparison 4 < 7 is rising, so high becomes two.
The next middle index is one; 5 > 4 is descending, so low becomes two.
Both bounds now identify value 4, the valley bottom.
Only two neighboring comparisons were needed.

## Complexity

Each step removes roughly half the remaining positions, giving O(log n) time.
The search stores only indices, so extra space is O(1).
No input values are modified.

## Edge cases

A two-element array converges after one comparison.
The local second example permits a decreasing array, which the reference correctly resolves to its last value.
An endpoint minimum is handled without an out-of-range access.

## Common mistakes

On an increasing slope, use high = mid rather than mid - 1, because mid may itself be the minimum.
The low < high loop ensures mid + 1 is valid.

## Language notes

Python uses floor division for the midpoint.
Java uses an unsigned right shift on the nonnegative index sum; both select the lower middle index.
