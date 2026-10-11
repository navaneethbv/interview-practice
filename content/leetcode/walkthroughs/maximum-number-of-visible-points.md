## Intuition

Only each point's direction from you matters. After converting points to angles, the question becomes: what is the largest group of angles that fits in a window `angle` degrees wide on a circle? Duplicating every angle plus 360 turns the circle into a line, and a sliding window answers it.

## Approach

1. Count points at your location separately; they are always visible.
2. Compute every other point's angle with atan2, in degrees.
3. Sort the angles and append each angle plus 360.
4. Slide a window over the list, shrinking from the left while its span exceeds `angle` (with a small tolerance), and track the largest window.
5. Add the points at your location.

## Walkthrough

In Example 1 from (1, 1), the points lie at 0, 45 and about 63.4 degrees, a span of 63.4, so all three fit in 90 degrees.

## Complexity

- Time: O(n log n).
- Space: O(n).

## Edge cases

- Angle 0 still sees every point in exactly one direction.
- Several points in the same direction are all visible.
- The window can wrap past 180 degrees, which the duplicated angles handle.

## Common mistakes

- Forgetting the wrap-around, so a view straddling the negative x-axis is missed.
- Comparing floating-point angles without a tolerance, so points exactly on the edge are dropped.
- Including points at your location in the angle list, where atan2(0, 0) gives a meaningless angle.
