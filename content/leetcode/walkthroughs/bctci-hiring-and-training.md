## Intuition

Several hiring days followed by one training day multiply the current recruiter count.
If there are r recruiters and h consecutive hiring days, training produces `(h + 1) * r` recruiters at a cost of `h + 1` days.

## Brute force

Search all states of trained and untrained staff using breadth-first search.
Although bounded staff makes this finite, it stores many states that can instead be summarized by multiplicative growth phases.

## Approach

The goal becomes factoring n into multipliers while minimizing their sum.
A composite multiplier `a * b` can be replaced by phases a and b because `a + b <= a * b` for integers at least two.
Therefore prime factors give an optimal cost.
The reference repeatedly divides n by `factor`, adding that factor to `answer` each time.
Once `factor * factor > n`, any remaining n greater than one is prime and contributes directly.

## Walkthrough

For Example 1, n is 6.
Factor 2 divides it, so `answer` becomes 2 and the remaining n becomes 3.
The loop stops and returns `2 + 3 = 5`.
Operationally, hire once and train to get two recruiters in two days.
Then hire twice and train, turning four additional employees into recruiters in three more days.

## Complexity

Trial division takes O(sqrt(n)) time in the worst case, using the original target as the bound.
Auxiliary space is O(1).

## Edge cases

A prime target requires that many days: hire target-minus-one times with the initial recruiter, then train.
Repeated prime factors each contribute separately, as for powers of two.

## Common mistakes

Do not add a prime factor only once when it divides repeatedly.
Recruiters keep recruiting during hiring days, but newly hired employees cannot recruit until training.

## Language notes

Python uses integer division to shrink n.
Java's integer arithmetic is safe under the target limit of 10,000, including the squared factor loop condition.
