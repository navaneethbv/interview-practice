## Intuition

The number of full pours is the largest integer q satisfying q times b at most a.
That predicate is monotone, so binary search can find the quotient without using division.

## Brute force

Repeatedly subtracting b until the container cannot hold another pour takes O(a / b) steps.
When b is small, binary search is substantially more efficient.

## Approach

Search possible counts between one and a.
The lower bound is feasible because a is greater than b, and a is a safe upper bound because b is at least one.
Use the upper midpoint `(low + high + 1) >> 1`.
If mid times b fits, move low to mid; otherwise move high to mid - 1.
The upper midpoint ensures progress when only two neighboring candidates remain and the lower bound is assigned to mid.
Return low when the interval collapses.

## Walkthrough

```text
Input: a = 18, b = 5
Output: 3
```

Example 1 searches for the largest count whose product with 5 is at most 18.
Candidates 10 and 5 are too large, reducing the upper bound to four.
Candidate 3 fits because 15 is at most 18, but candidate 4 fails because 20 exceeds 18.
The bounds meet at 3, leaving three unused gallons that cannot hold another full pour.

## Complexity

The search halves a range of size a, giving O(log a) time.
Two bounds and one midpoint use O(1) extra space.
No repeated-volume array is constructed.

## Edge cases

If a is an exact multiple of b, the fitting equality must be accepted.
For b equal to one, the result is a.
A capacity only slightly above b yields one pour.

## Common mistakes

A lower midpoint with low = mid can cause an infinite loop.
Avoid overflow when multiplying the candidate count by b.

## Language notes

Python uses arbitrary-precision integers and right shift.
Java uses long bounds and multiplication, then casts the final count back to int because it cannot exceed a.
