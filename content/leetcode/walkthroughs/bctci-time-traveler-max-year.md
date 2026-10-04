## Intuition

Moving between consecutive landing points lets the traveler skip the aging represented by that gap.
For a fixed landing point, using jumps on the largest gaps leaves the least aging time before that point.
A min-heap keeps exactly those largest gaps while the scan advances.

## Brute force

Trying every choice of up to k gaps would enumerate combinations and become infeasible.
Scanning every possible jump set also repeats the same prefix calculations.

## Approach

Start with points[0] plus all available aging because no jump is needed for that answer.
For each next landing point, add its gap to a min-heap and to jumped_total.
When the heap contains more than k gaps, remove its smallest gap.
The retained sum is therefore the sum of the k largest gaps seen so far.
Compute aged as the total span from points[0] minus jumped_total.
If aged fits maxAging, spend the remaining aging budget after that landing point and update best.

## Walkthrough

In Example 1, the gap from 2020 to 2024 is 4.
With one jump, the heap retains that gap, so aged is zero at 2024.
The remaining one aging year reaches 2025, which improves the initial answer of 2021.
The same calculation also shows why a jump changes the landing time without consuming aging years.

## Complexity

For n landing points, each gap enters and leaves the heap at most once.
The scan takes O(n log k) time and the heap uses O(k) space.
All distance calculations use wide integer values in Java and naturally wide integers in Python.

## Edge cases

When k is zero, the heap immediately discards every gap and aging is the full elapsed span.
If maxAging is large, the best result can lie well beyond the final landing point.
The initial answer covers aging directly from points[0].
Only landing points reachable within the budget can seed a later extension.

## Common mistakes

Keeping the k smallest gaps would maximize aging instead of minimizing it.
Subtracting jumped_total from the wrong span loses the cost of gaps that were not jumped.
Forgetting the initial answer misses years reached without using any landing point.

## Language notes

Python uses heapq, which is a min-heap, and stores integer gaps.
Java uses PriorityQueue<Long> so subtraction and the returned year remain safe for large values.
Both implementations update best only after confirming that the landing point is reachable.
