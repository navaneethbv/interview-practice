## Intuition
The string at level n consists of the previous string, a middle 1, and the reversed inverted previous string.
The requested index either stays in the first half, is the middle, or mirrors into the second half.

## Brute force
Building the full recursive string grows exponentially in n and stores every character.
Index recursion follows one branch and uses logarithmic recursion depth.

## Approach
1. Return zero for the base string.
2. Compute the middle index `2^(n-1)`.
3. Return one at the middle, recurse unchanged in the first half, or mirror and invert in the second half.
4. Continue until n equals one.

## Walkthrough
Example 1 asks for bit 1 of the level-3 string.
Its middle is index 4, so index 1 lies in the first half and reduces to level 2, then level 1.
The base string's only bit is zero, so the answer is `0`.

## Complexity
Each recursion reduces n by one, giving O(n) time and O(n) recursion space.
No full binary string is allocated.

## Edge cases
The middle position always returns one without descending.
An index mirrored into the second half must invert the recursive result.
The input position is one-based, matching the constructed string definition.

## Common mistakes
Using zero-based middle arithmetic changes which position is special.
Mirroring with `k - middle` instead of `2*middle - k` reverses the second half incorrectly.
Forgetting inversion makes the second half merely reversed rather than reversed and complemented.

## Language notes
Python returns one-character strings, while Java returns `char` values.
Both use a recursive call depth bounded by n, which is within the local statement limit.
