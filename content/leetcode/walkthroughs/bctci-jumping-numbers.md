## Intuition

A jumping number can be extended only by a digit one smaller or one larger than its last digit.
Generate valid numbers directly instead of testing every positive integer below n.

## Brute force

Scanning every integer and checking all adjacent digits takes O(n log n) digit work.
Generation explores only valid prefixes and a small number of children beyond the bound.

## Approach

Start recursive growth from digits 1 through 9, avoiding leading zeroes.
If number is at least n, stop that branch.
Otherwise append it to found, inspect its last digit, and recursively append last - 1 or last + 1 when that digit lies between 0 and 9.
Appending increases a positive number, so a branch beyond the bound can never return to range.
Every valid multi-digit number has a unique valid prefix, ensuring complete generation without duplicates.
Sort found before returning it.

## Walkthrough

```text
Input: n = 34
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 21, 23, 32]
```

For Example 1, all single digits 1 through 9 qualify.
The first-digit branches also generate 10, 12, 21, 23, and 32 below 34.
The candidate 34 equals the bound and is excluded.
Longer generated values already exceed the bound.
Sorting these discoveries gives the stated increasing list.

## Complexity

For J returned numbers and maximum digit length d, generation takes O(J + 1) recursive calls up to a constant branching factor.
Sorting costs O(J log J), and output plus recursion uses O(J + d) space.

## Edge cases

For n equal to one, no positive candidate qualifies.
A final zero has only digit 1 as a valid extension.
A final nine has only digit 8.

## Common mistakes

Do not include zero as an output or allow leading-zero branches.
Use a strict smaller-than bound.

## Language notes

Python integers safely grow during candidate generation.
Java uses long for recursive candidates before checking the int-sized bound, avoiding overflow in the multiplication by ten.
