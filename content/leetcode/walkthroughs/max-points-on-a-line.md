## Intuition

Fixing one point turns every other point into a normalized direction from that anchor.
Points sharing the same reduced direction lie on one line through the anchor.
Counting directions for each anchor and taking the largest count finds the global line.

## Brute force

Checking every pair of points and every remaining point can take O(n cubed) time.
Floating-point slopes can also misclassify lines because equivalent fractions round differently.
Normalized integer direction pairs avoid division and reduce the standard method to O(n squared).

## Approach

1. Choose each point as an anchor.
2. Compute delta x and delta y to every later point.
3. Divide both deltas by their greatest common divisor.
4. Normalize the sign so opposite representations share one key.
5. Count each direction and update the best line size.

## Walkthrough

Example 1 has points [1,1], [2,2], and [3,3].
From anchor [1,1], both other points reduce to direction [1,1].
The direction count is two other points, so the line size is three.
No later anchor produces a larger count, and the method returns 3.

## Complexity

For n points, each anchor compares with O(n) other points, giving O(n squared) time.
Each anchor's direction map uses O(n) temporary space.
Across one anchor at a time, auxiliary space is O(n), while the answer is one integer.
Greatest-common-divisor normalization keeps arithmetic exact, with constant-cost integer arithmetic under the stated coordinate bounds.

## Edge cases

One point returns 1.
Two points always form a line of size 2.
Vertical lines normalize to delta x zero with a positive delta y.
Horizontal lines normalize to delta y zero with a positive delta x.

## Common mistakes

- Comparing unreduced slopes treats 1 over 2 and 2 over 4 as different.
- Allowing both signs creates duplicate direction keys.
- Multiplying Java int deltas before widening can overflow.
- Using floating-point division loses exactness for large coordinates.

## Language notes

Python uses math.gcd and tuple keys.
Java widens coordinate differences, reduces them with a long gcd helper, and uses a string key.
Both references avoid floating-point slopes.
