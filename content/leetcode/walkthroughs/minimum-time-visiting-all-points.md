## Intuition
One diagonal step can reduce both coordinate distances by one.
Once the smaller distance is exhausted, ordinary horizontal or vertical steps finish the remaining distance.
The minimum travel time between two consecutive points is therefore the larger of their two absolute coordinate differences.

## Brute force
Simulate the trip one second at a time, choosing a diagonal step whenever both coordinates differ and otherwise moving along the remaining axis.
This takes time proportional to the total travel distance, even when only two points are supplied.
Computing the distance directly avoids visiting intermediate coordinates.

## Approach
1. Initialize the total time to zero.
2. For each point after the first, compare its coordinates with those of its predecessor.
3. Compute the absolute horizontal and vertical differences.
4. Add the larger difference to the total and return the completed sum.

Every second changes each coordinate by at most one, so reaching a point requires at least the larger coordinate difference in seconds.
Diagonal moves followed by straight moves attain that lower bound.
The visiting order is fixed, and each leg ends at its required point, so minimizing each leg independently minimizes the complete trip.

## Walkthrough
Example 1 contains `[[0,0],[3,2],[3,5]]`.
For the first leg, the coordinate differences are three and two.
Two diagonal steps reach `[2,2]`, and one horizontal step reaches `[3,2]`, taking three seconds.
For the second leg, the differences are zero and three.
Three vertical steps reach `[3,5]`.
The accumulated answer is `3 + 3 = 6`.

## Complexity
For n points, the references examine n minus one consecutive pairs, giving O(n) time.
They keep only the total and current coordinate differences, so auxiliary space is O(1).
Neither implementation copies the tail of the points array or stores the route.

## Edge cases
A single point requires zero travel time.
Repeated consecutive points also contribute zero.
Negative coordinates work normally because distances use absolute differences.
Passing through a later point early does not replace the required visit in the stated order.

## Common mistakes
- Adding both coordinate differences overcounts when diagonal movement is possible.
- Sorting the points changes the required visiting order.
- Using the smaller difference counts diagonal steps but omits the remaining straight steps.

## Language notes
Python uses indexed access and `abs`.
Java uses `Math.abs` and integer arithmetic; the local coordinate and point-count bounds keep both individual differences and their total within `int`.
