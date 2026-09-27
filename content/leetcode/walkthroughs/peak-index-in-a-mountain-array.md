## Intuition

The values rise before the peak and fall after it.
At a midpoint, an increasing next value means the peak is to the right, otherwise the midpoint can remain the peak candidate.

## Brute force

A linear scan finds the first index whose next value is smaller.
That takes O(n) time and O(1) space.

## Approach

1. Keep an inclusive search range.
2. Compare the midpoint with its right neighbor.
3. Move left past an increasing midpoint or keep the midpoint and move the right bound otherwise.
4. Return the converged index.

## Walkthrough

Example 1:

For [0,2,1], the midpoint is index 1.
Value 2 is greater than its right neighbor 1, so the right bound becomes index 1.
The remaining midpoint is index 0, whose next value is larger, so the left bound moves to index 1.
The bounds converge at index 1, which is the peak.

## Complexity

Each comparison removes about half the range, giving O(log n) time.
Both Python and Java use O(1) auxiliary space.

## Edge cases

The constraints guarantee at least three values and a valid mountain.
The peak can be adjacent to either end of the valid interior range.
The returned index is the peak position, not the peak value.

## Common mistakes

Do not move left when the midpoint is increasing.
Do not read midpoint plus one after the range has excluded it.
Use the strict mountain property instead of assuming an arbitrary array is unimodal.

## Language notes

Python integer division and Java integer division both safely compute the midpoint here.
The public method names and primitive return type remain unchanged.
