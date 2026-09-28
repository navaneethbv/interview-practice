## Intuition

For a horizontal line, each square contributes its side length to the active horizontal width between its bottom and top.
The counted area below the line is therefore a piecewise linear function of the line height.

## Brute force

Binary searching a floating height and rescanning every square is simple, but it repeats work and can lose a half-unit at large coordinates.
Computing a geometric union would also be incorrect because overlap is counted separately for every square.

## Approach

1. Add `(bottom, +side)` and `(top, -side)` events and sum every square's integer area.
2. Sort the events and sweep upward while maintaining the active side-length total.
3. Use doubled integer areas to detect the strip containing half of the total without rounding.
4. Solve the linear equation inside that strip, converting only the final fraction to `double`.

## Walkthrough

For Example 1, `[0,0,2]` and `[3,2,2]` contribute total area 8, so the target doubled area is 8.
At y=0 the active width is 2, and the strip to y=2 adds area 4.
At y=2 the first square ends and the second starts, so the accumulated doubled area is `2 * 4 = 8`.
The smallest valid boundary is y=2, and the method returns `2.0`.

## Complexity

For S squares, sorting 2S events costs O(S log S) time and the sweep costs O(S) time.
Python stores O(S) tuple events and keeps areas as arbitrary-size integers.
Java stores O(S) two-column `long` events and uses `BigInteger` for area because 50000 squared sides can exceed `long`.

## Edge cases

Events at the same height are grouped so zero-height strips do not affect the result.
A single square returns its midpoint.
Overlapping squares contribute independently throughout the sweep.

## Common mistakes

Do not subtract overlap.
Do not compare rounded floating totals when an exact doubled-area comparison is available.
Do not skip the interval before the first event that reaches the target.

## Language notes

Python converts only the final numerator divided by twice the active width.
Java uses fully qualified `BigInteger` and converts the final fraction to `double`.
For the valid input `[[0,0,500000000],[0,1000000000,500000000],[0,750000000,1]]`, exact accumulation returns `750000000.5`.
