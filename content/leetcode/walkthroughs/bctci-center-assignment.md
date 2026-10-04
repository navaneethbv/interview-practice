## Intuition

The relevant choice is a point's relative cost between the two centers.
A point that is expensive for both centers may still strongly prefer one of them.
The balance constraint means exactly half of these relative preferences must be selected.

## Brute force

Enumerate every subset of half the points and assign that subset to `center1`.
There are binomially many possibilities, making this approach exponential.

## Approach

Build `costs` containing each point's Euclidean distance to both centers.
Sort those pairs by `first - second`.
Assign the first `half` pairs to `center1` and all remaining pairs to `center2`.
To prove the choice, imagine initially assigning everyone to `center2`.
Moving a point to `center1` changes the total by exactly its sorted difference.
Selecting the smallest half minimizes the sum of those changes.
If a selected difference exceeded an unselected difference, swapping their assignments would improve or preserve the total.

## Walkthrough

In Example 1, all four points have distance 1 to `[0, 0]`.
Their distances to `[1, 1]` are `1, 1, sqrt(5), sqrt(5)` in input order.
The two negative differences belong to `[-1, 0]` and `[0, -1]`, so those points go to `center1`.
The other two go to `center2`, each at distance 1.
The total is `1 + 1 + 1 + 1 = 4.0`.

## Complexity

Computing distances takes O(n), sorting takes O(n log n), and summing takes O(n).
The `costs` array and Python's slices use O(n) auxiliary space.

## Edge cases

No points give total zero.
Equal differences permit either tied assignment without changing the optimum, and coincident centers are handled naturally.

## Common mistakes

Do not sort by only one distance or assign every point independently to its nearest center.
Those choices can violate the required equal group sizes.

## Language notes

Python uses `math.dist`; Java uses `Math.hypot` and `double` costs.
Keep the calculation in floating point instead of rounding each distance before summing.
