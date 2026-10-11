## Intuition

A good subsequence has one shared frequency f for every letter it uses. For a fixed f, each letter is either absent or contributes exactly f of its occurrences, chosen in C(count, f) ways, independently of the other letters.

## Approach

1. Count each letter.
2. For every f from 1 to the largest count, multiply `(1 + C(count, f))` over the letters; letters with fewer than f occurrences contribute only 1.
3. Subtract 1 for the empty choice and add to the total, modulo 10^9 + 7.

## Walkthrough

For aabb, f = 1 gives (1 + 2)(1 + 2) - 1 = 8 and f = 2 gives (1 + 1)(1 + 1) - 1 = 3, for 11 in total.

## Complexity

- Time: O(26 * n) with precomputed binomials.
- Space: O(n).

## Edge cases

- A string of one repeated letter counts all its non-empty subsequences.
- Different frequencies never double count, because a good subsequence has exactly one f.

## Common mistakes

- Counting distinct strings instead of position sets.
- Forgetting to subtract the empty subsequence once per f.
