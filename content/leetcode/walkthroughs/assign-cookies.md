## Intuition
The smallest uncontent child should receive the smallest cookie that can satisfy that child.
Sorting both lists lets one pass make this greedy choice without wasting a large cookie on an easy child.

## Brute force
A naive solution tries every assignment of cookies to children.
With g children and s cookies, the search can be exponential in min(g, s).
Checking all assignments is unnecessary because exchanging a larger cookie for a smaller feasible one never reduces the number satisfied.

## Approach
1. Sort greed factors and cookie sizes.
2. Scan cookies from smallest to largest.
3. Assign a cookie when it meets the next smallest unsatisfied greed factor.
4. Return the number of assigned children.

## Walkthrough
Example 1 has greed factors `[2, 3]` and cookies `[1, 2, 3]`.
After sorting, cookie 1 cannot satisfy child greed 2, so it is skipped.
Cookie 2 satisfies the first child and advances the child index.
Cookie 3 satisfies the remaining child.
Both children are assigned, so the result is 2.

## Complexity
Sorting costs O(g log g + s log s) time.
The scan costs O(g + s) time.
Python's `sorted` and Java's cloned arrays use O(g + s) auxiliary space for copies.

## Edge cases
No cookies or no children returns zero.
Equal cookie and greed values are feasible.
A large cookie can satisfy only one child and should not be reused.

## Common mistakes
Sorting only one list can miss a feasible assignment.
Advancing the child when a cookie is too small incorrectly discards that child.
Using a cookie on a later, greedier child before an easier one can reduce the count.

## Language notes
Python creates sorted list copies and leaves the input lists unchanged.
Java clones before `Arrays.sort`, so its input arrays are also preserved.
