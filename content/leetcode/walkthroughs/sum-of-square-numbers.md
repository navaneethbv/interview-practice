## Intuition
For a fixed left square, increasing the right root increases the sum.
Two pointers can therefore move toward a target without trying every pair.

## Brute force
Trying every `a` from zero through the square root and testing whether `c - a*a` is a square takes O(sqrt(c) log c) time with a square test.
The two-pointer scan removes the repeated square-root tests.

## Approach
1. Set `left` to zero and `right` to floor sqrt(c).
2. Compare `left^2 + right^2` with c.
3. Increase left when the sum is too small, otherwise decrease right.
4. Stop when the pointers cross.

## Walkthrough
Example 1 has c = 13, so the initial pointers are left 0 and right 3.
The sum is 0 plus 9, which is less than 13, so left becomes 1.
The sum is 1 plus 9, still less, so left becomes 2.
The sum is 4 plus 9, exactly 13, so the method returns `true`.

## Complexity
The pointers move at most O(sqrt(c)) times.
The time is O(sqrt(c)) and auxiliary space is O(1).
Python uses `isqrt`, while Java uses a floating estimate only to initialize the pointer.

## Edge cases
Zero is represented by two zero roots.
A perfect square can be found when the two pointers meet, including the initial right root for a zero input.
Java uses `long` for square arithmetic so values near the integer limit do not overflow.

## Common mistakes
Moving the wrong pointer can skip valid pairs.
Using floating equality for the sum risks precision errors.
Forgetting that both roots may be zero rejects c zero.

## Language notes
Python's arbitrary precision integers make multiplication safe.
Java's `long` products preserve exact arithmetic before comparison with the `int` input.
