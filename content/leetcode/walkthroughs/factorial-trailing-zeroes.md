## Intuition
A trailing zero is created by a factor pair 2 times 5.
Factorials contain more twos than fives, so the answer is the number of factors of five.
Multiples of 25, 125, and higher powers contribute extra factors counted by repeated division.

## Brute force
Constructing n factorial and converting it to decimal is infeasible as n grows.
Counting powers of five avoids the enormous intermediate value entirely.

## Approach
1. Set the result to zero.
2. Divide n by 5 and add the quotient.
3. Repeat using the quotient until it becomes zero.
4. Return the accumulated count.

## Walkthrough
Example 1 uses n equal to 10.
The first division gives `10 // 5 = 2`, counting factors from 5 and 10.
The next division gives zero, so no higher power contributes.
The result is 2 trailing zeroes.
For n equal to 25, the divisions contribute 5 and then 1, totaling 6.

## Complexity
The loop runs O(log base 5 of n) times.
It uses O(1) additional space.

## Edge cases
Zero factorial is 1 and has zero trailing zeroes.
Values below five also return zero.
Multiples of a higher power of five need repeated divisions.

## Common mistakes
Counting only multiples of five misses the extra factor from 25.
Dividing the original n repeatedly without updating it overcounts.
Building the factorial wastes time and memory.

## Language notes
Python integer division and Java integer division both discard the remainder as required.
The result fits an `int` for the stated n bound.
Neither implementation allocates the factorial.
