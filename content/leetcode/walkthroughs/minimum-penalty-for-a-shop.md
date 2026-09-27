## Intuition

Closing at hour j charges for `Y` customers after j and for `N` hours before j.
Start with the penalty for closing at hour zero, then update it when the closing time moves one hour later.

## Brute force

Computing both prefix and suffix penalties independently for every closing hour costs O(n^2).
A rolling penalty updates the same quantities in constant time.

## Approach

1. Initialize the penalty for closing immediately as the number of `Y` characters.
2. Move the closing time from hour 0 through hour n - 1.
3. When passing a `Y`, remove one closed-customer penalty; when passing an `N`, add one open-empty-hour penalty.
4. Update the answer only on a strictly smaller penalty, preserving the earliest tie.

## Walkthrough

This is Example 1 from the local statement.
For `customers = "YYNY"`, closing at hour 0 starts with penalty 3.
Moving past the first Y lowers it to 2, and moving past the second Y lowers it to 1, so answer becomes 2.
Moving past N raises the penalty to 2, and moving past the final Y lowers it to 1 again at hour 4.
Because hour 4 ties rather than improves the best, the earliest answer remains 2.

## Complexity

Counting initial customers and scanning the string take O(n) time.
The method uses O(1) auxiliary space beyond the input string.

## Edge cases

All `N` characters favor closing at hour zero.
All `Y` characters favor staying open through the final hour.
Equal penalties retain the earliest closing time because updates use `<`.

## Common mistakes

Initialize with the penalty at closing hour zero, not hour one.
Treat a passed `Y` and `N` in opposite directions.
Use a strict improvement test so ties do not move the answer later.

## Language notes

Python uses `count("Y")`, while Java counts the characters explicitly.
Both scan hours with the same penalty transition and return an integer hour.
