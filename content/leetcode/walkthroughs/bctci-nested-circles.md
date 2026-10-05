## Intuition

Strict containment forces the outer circle to have a larger radius.
Sorting by decreasing radius therefore determines the only possible nesting order.
It then suffices to check consecutive circles, because strict containment is transitive.

## Brute force

Check all pairs and attempt to determine which circle contains which.
This needs O(n²) geometric comparisons and still requires arranging the containment relation into a chain.

## Approach

Create `ordered` sorted by descending radius.
For each neighboring `outer` and `inner`, compute radius difference `gap` and center displacement `dx, dy`.
Containment without touching requires center distance strictly less than gap.
Reject nonpositive gaps immediately, then compare squared quantities: reject when `dx * dx + dy * dy >= gap * gap`.
Positive gap makes squaring safe and avoids square roots or floating-point tolerances.
If every adjacent pair passes, each circle contains its successor and consequently every smaller circle after it.

## Walkthrough

Example 1 contains circles `[4, 4, 5]` and `[8, 4, 2]`.
They are already in decreasing-radius order.
The radius gap is `5 - 2 = 3`, while the center displacement is `dx = -4`, `dy = 0`.
The squared center distance is 16 and the squared gap is 9.
Since 16 is not strictly less than 9, the smaller circle extends outside the larger one.
The method returns false.

## Complexity

Sorting takes O(n log n) time and the adjacent scan takes O(n).
The copied ordering and sorting workspace use O(n) auxiliary space.

## Edge cases

One circle is nested by definition and performs no pair checks.
Equal radii always fail for a pair, including identical circles.
Internal tangency also fails because containment must be strict.

## Common mistakes

Do not compare only radii while ignoring centers.
Do not accept equality in the squared-distance test.

## Language notes

Python sorts a new list and uses arbitrary-precision integer arithmetic.
Java clones the outer array, leaves circle coordinates unchanged, and uses long values for squared geometric expressions.
