## Intuition

To maximize a number with one swap, improve the earliest digit possible.
For each position, the best replacement is the largest digit that appears later, and using its last occurrence leaves the strongest suffix.
If no later digit is larger, the current position should remain unchanged.

## Brute force

Trying every pair of digit positions and converting each candidate back to an integer takes O(d²) time for d digits.
The last-position table reduces the search to the ten possible digit values at each position.

## Approach

1. Convert num to digit characters.
2. Record the last index where each digit appears.
3. Scan positions from left to right.
4. Test candidate digits from 9 down to one larger than the current digit.
5. Swap with a later occurrence of the first feasible candidate and return.
6. Return the original number when no improvement exists.

## Walkthrough

Example 1 uses num = 2736.

| index | current digit | larger later digit | action |
| ---: | ---: | --- | --- |
| 0 | 2 | 7 at index 1 | swap immediately |
| result | 7 | remaining suffix 236 | 7236 |

The first position is improved from 2 to 7, which is better than any swap starting later.

## Complexity

Let d be the number of decimal digits.
The last-position table has ten entries and each position checks at most ten candidates, so time is O(d).
The digit array and last-position table use O(d) space, including the returned integer conversion.

## Edge cases

A one-digit number cannot improve.
A number with descending digits already has no better later digit.
Repeated digits require the rightmost occurrence to maximize the suffix.
Zero is handled as the single digit "0" and remains zero.

## Common mistakes

- Choosing the first larger later digit instead of the largest one can miss the maximum.
- Swapping at a later position after an earlier improvement gives a smaller number.
- Using the first occurrence of a duplicate digit can weaken the suffix.
- Performing more than one swap violates the operation limit.

## Language notes

Python stores last positions in a dictionary keyed by digit characters.
Java uses a fixed array indexed by numeric digits and creates a char array for swapping.
Both parse the final digit sequence only after the first improving swap.
