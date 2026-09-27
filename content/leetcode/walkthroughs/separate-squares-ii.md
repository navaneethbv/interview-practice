## Intuition
The union area changes only at square bottoms and tops, so between consecutive event heights its covered horizontal width is constant.
A compressed x-axis segment tree maintains that width while a vertical sweep records exact area strips.

## Brute force
Painting every unit coordinate would be infeasible because coordinates reach one billion.
Sweeping each event across every x interval would cost O(N^2) in the worst case, which compression and a segment tree avoid.

## Approach
1. Collect every left and right x boundary and compress them into elementary intervals.
2. Turn each square into an add event at its bottom and a remove event at its top.
3. Sweep events upward, recording `(bottom, top, covered width)` before applying each event.
4. Sum strip areas exactly, then find the first strip where twice the accumulated area reaches the total union area.
5. Interpolate within that strip and return its lowest balancing height.

## Walkthrough
Example 1 has two copies of `[0,0,2]` and `[0,2,1]`.
The duplicate bottoms add coverage only once, so from y 0 to y 2 the covered width is 2 and the area is 4.
From y 2 to y 3 the width is 1 and the area is 1, giving total union area 5.
Halfway is area 2.5, which lies in the first strip at `y = 0 + 2.5 / 2 = 1.25`.
The exact doubled-area comparison identifies this strip before the final floating-point interpolation.

## Complexity
With N squares and at most 2N compressed x coordinates, sorting and coordinate maps take O(N log N) time.
Each of 2N events updates a segment tree in O(log N), for O(N log N) total time.
The coordinate arrays, events, strips, and tree require O(N) auxiliary space.

## Edge cases
Duplicate squares increase a cover count but do not increase covered width.
Disjoint vertical bands create zero-width gaps between recorded strips and still use the lowest balancing line.
A single square returns its midpoint height.

## Common mistakes
Summing square areas double-counts overlaps.
Applying an event before measuring the preceding strip shifts area to the wrong height interval.
Comparing halves only after converting the total to a floating point value can lose a tiny strip at large coordinates.

## Language notes
Python keeps doubled-area decisions in integers and converts only the interpolated answer.
Java uses `long` for compressed lengths and areas, then performs the final division as `double`.
