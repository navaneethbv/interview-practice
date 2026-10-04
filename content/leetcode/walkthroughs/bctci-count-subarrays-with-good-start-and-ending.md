## Intuition

Only the two endpoints matter; bad days inside the interval are allowed.
After identifying good-day positions, choosing an ordered pair of those positions with start no later than end uniquely determines a qualifying subarray.

## Brute force

Enumerating every start and end and testing their sales values costs O(n squared) time.
The actual distances between good positions do not affect how many endpoint pairs exist.

## Approach

Count the number `good` of values at least 10.
There are `good * (good - 1) / 2` pairs of distinct good positions.
Each pair defines exactly one interval, with the earlier position as its start.
There are also `good` one-day intervals whose start and end coincide.
Adding these terms gives `good * (good + 1) / 2`, the formula used by the reference.
No list of good indices or scan of the intervals between them is necessary.

## Walkthrough

```text
Input: sales = [0, 20, 5, 15, 10]
Output: 6
```

Example 1 has good days at zero-based indices 1, 3, and 4, with sales 20, 15, and 10.
The three singletons qualify.
The distinct endpoint pairs `(1, 3)`, `(1, 4)`, and `(3, 4)` supply three additional intervals.
The intervening bad day at index 2 is permitted.
With good equal to 3, the formula gives 3 times 4 divided by 2 = 6.

## Complexity

Counting good days takes O(n) time.
The formula takes constant time and uses O(1) extra space.
The input remains unchanged.

## Edge cases

No good days means zero qualifying intervals.
One good day contributes its singleton.
If all days are good, all n(n + 1)/2 intervals qualify.

## Common mistakes

Do not require every interior day to be good.
Do not exclude singleton intervals by choosing only distinct endpoints.

## Language notes

Python performs exact integer division with `//`.
Java stores good as long before multiplication, ensuring that a large quadratic count does not overflow int arithmetic.
