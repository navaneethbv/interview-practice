## Intuition
At one bit position, every one pairs with every zero to create a differing bit.
For that bit the contribution is `ones * zeros`, and contributions add independently across bits.

## Brute force
Comparing every pair and counting differing bits takes O(n^2 * B) time for n numbers and B bit positions.
It uses O(1) extra space but repeats the same bit comparisons across many pairs.

## Approach
1. Visit the 30 nonnegative input bit positions used by the local contract.
2. Count numbers with a one at that bit.
3. Multiply that count by the zero count.
4. Add the contribution to the total.

## Walkthrough
Example 1 is `[1, 2, 3]`.
At bit zero, two numbers have a one and one has zero, contributing 2.
At bit one, two numbers have a one and one has zero, contributing another 2.
All higher bits are zero for every value and contribute 0.
The total is therefore 4.

## Complexity
With B fixed at 30, the time is O(Bn), or O(n) under the local integer bound.
The algorithm uses O(1) auxiliary space.
The result is accumulated as an integer and no pair list is stored.

## Edge cases
Equal values contribute zero.
A single number has no pair and returns zero.
Zero contributes zero bits but still participates in opposite-bit pairs.

## Common mistakes
Counting only one bits without multiplying by zeros undercounts pairs.
Comparing each ordered pair doubles the intended distance.
Using a fixed 32-bit signed interpretation can mishandle the local nonnegative contract.

## Language notes
Python shifts arbitrary precision integers and loops through the contract's 30 bits.
Java uses signed right shifts, but the local inputs are nonnegative and within the same 30-bit range.
