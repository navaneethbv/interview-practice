## Intuition

At each position, a star can change the number of unmatched opening parentheses by minus one, zero, or plus one.
Maintain the smallest and largest possible unmatched counts after the prefix.
If the maximum becomes negative, every interpretation has closed too early, and at the end a zero minimum means some interpretation is balanced.

## Brute force

Replacing every star with three choices creates up to 3^n strings.
The range of possible unmatched counts merges those choices into two integers.

## Approach

1. Start minimum_open and maximum_open at zero.
2. Update both bounds for an opening parenthesis, closing parenthesis, or star.
3. Reject when maximum_open is negative.
4. Clamp minimum_open to zero because negative unmatched openings are impossible.
5. Return whether minimum_open is zero after the whole string.

## Walkthrough

Example 1 uses s = "(*))".
After '(' the range is [1, 1].
After '*' it becomes [0, 2], representing empty, closing, or opening interpretations.
After the next ')' it becomes [0, 1].
After the final ')' it becomes [0, 0], so a balanced interpretation exists.

## Complexity

- Time: O(n), for one pass through s.
- Space: O(1), for the two bounds.

## Edge cases

A leading ')' immediately makes maximum_open negative.
An all-star string can choose every star as empty.
A final positive minimum means every interpretation leaves an opening unmatched.
Clamping the minimum prevents impossible negative counts from influencing later states.

## Common mistakes

- Tracking only one star interpretation loses valid alternatives.
- Letting maximum_open go below zero permits an early closing parenthesis.
- Returning maximum_open == 0 accepts strings that cannot close all openings.
- Treating stars as always opening or always empty solves a different problem.

## Language notes

Python and Java both update the lower and upper range explicitly.
The Java conditional branches make the three star choices visible.
