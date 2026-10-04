## Intuition

Between training days, the recruiter count stays fixed.
If r recruiters perform h hiring days and then one training day, the recruiter count becomes `(h + 1) * r` at a cost of h + 1 days.

## Brute force

Searching all recruiter and untrained-employee states is possible for small n but ignores this multiplicative structure.
Instead, choose a factorization of n whose factor sum is minimal.

## Approach

Each useful hiring-and-training block multiplies the recruiter count by an integer factor f at a cost of f days.
Splitting a composite factor ab into successive factors a and b costs a + b instead of ab, never more for a and b at least two.
Repeated splitting therefore yields prime factors as an optimal choice.
The reference trial-divides n, adding each discovered factor to answer and dividing it out repeatedly.
Any remainder above one is a final prime factor and is added.

## Walkthrough

```text
Input: [6]
Output: 5
```

Example 1 has n = 6 with factors 2 and 3.
One hiring day plus one training day produces two recruiters in two days.
Those two recruiters then hire on two days, creating four untrained employees, and train them on the next day.
This produces six recruiters in three more days, totaling 5.
Staff never exceeds six during this schedule.

## Complexity

Trial division takes O(sqrt(n)) time in the worst case and O(1) extra space.
Removing small factors early often reduces the remaining trial range.

## Edge cases

A prime target p requires p days through p - 1 hiring days and one training day.
Repeated prime factors contribute repeatedly.
Training with nobody untrained cannot improve an optimal schedule.

## Common mistakes

Do not count only distinct prime factors.
The answer is the sum of factors, not their number or product.

## Language notes

Python updates n with integer floor division.
Java integer division has the same exact behavior because division occurs only after confirming divisibility.
