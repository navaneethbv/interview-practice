## Intuition

Divisors occur in pairs: whenever d divides n, n divided by d also divides n.
At least one member of each pair is no larger than the square root, so only that first half needs testing.

## Brute force

Trying every integer from one through n takes O(n) divisibility checks.
Pairing divisors reduces the search to O(sqrt(n)) candidates.

## Approach

Maintain `small` and `large` result lists.
For each divisor through the integer square root, test whether the remainder is zero.
Append a successful divisor to small and its partner to large unless both are equal.
Small divisors arrive in increasing order, while their partners arrive in decreasing order.
Reverse large and append it to small to obtain the complete increasing result without a comparison sort.
Every positive divisor belongs to one tested pair, establishing completeness.

## Walkthrough

```text
Input: [12]
Output: [1, 2, 3, 4, 6, 12]
```

Example 1 tests 1, 2, and 3 for n = 12.
All divide evenly, producing small `[1, 2, 3]` and large `[12, 6, 4]`.
Reverse the latter to `[4, 6, 12]` and concatenate.
The final list is `[1, 2, 3, 4, 6, 12]`.
No candidates above the square root need separate testing.

## Complexity

Time is O(sqrt(n) + D), where D is the number of returned divisors.
Storage is O(D), including both intermediate lists and the result.

## Edge cases

For n equal to one, return `[1]` once.
A prime number yields 1 and itself.
A perfect square has one middle divisor that must not be duplicated.

## Common mistakes

Do not append equal pair members twice.
Appending large partners directly after each small divisor would destroy sorted order.

## Language notes

Python uses `math.isqrt` for an exact integer boundary.
Java tests `divisor <= n / divisor`, avoiding overflow that could occur with a squared loop condition at larger bounds.
