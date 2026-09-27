## Intuition

Integer division asks how many shifted copies of the divisor fit inside the dividend magnitude.
Trying shifts from large to small greedily constructs the quotient bits.
The final sign is determined by whether exactly one input is negative.

## Brute force

Repeated subtraction gives the correct quotient but can take O(abs(dividend)) time.
Repeatedly doubling the divisor without recording powers still repeats work while searching for each contribution.
Bit shifts test all fixed-width powers in O(32) time.

## Approach

1. Record whether the result should be negative.
2. Convert both inputs to nonnegative magnitudes using a wide representation.
3. Check divisor times each power of two from shift 31 down to shift 0.
4. Subtract a fitting shifted divisor and set the corresponding quotient bit.
5. Apply the sign and clamp the result to the signed 32-bit range.

## Walkthrough

Example 1 divides 10 by 3.
Large shifts do not fit, while 3 shifted by one gives 6 and is subtracted from 10.
The remainder is 4, and the unshifted divisor 3 fits once more.
The quotient bits represent 3, and the method returns 3.

## Complexity

The loop has 32 fixed shifts, so time is O(1) under the 32-bit input contract.
The method uses O(1) auxiliary space.
Java widens magnitudes and shifted values to long before arithmetic, preventing overflow for Integer.MIN_VALUE.
The clamp handles the one positive result that exceeds signed 32-bit range.

## Edge cases

A negative dividend and positive divisor produce a negative quotient.
Two negative inputs produce a positive quotient.
Integer.MIN_VALUE requires widening before taking its magnitude.
Division truncates toward zero because the magnitude quotient is signed only at the end.

## Common mistakes

- Taking abs of Java int before widening overflows for Integer.MIN_VALUE.
- Applying the sign before greedy subtraction complicates comparisons with positive magnitudes.
- Forgetting the overflow clamp returns an unrepresentable positive value.
- Testing shifts from low to high misses the greedy quotient construction.

## Language notes

Python integers can represent the widened magnitude directly.
Java uses long for the magnitude and shifted divisor, then clamps before casting.
Both implementations avoid division and multiplication loops whose running time depends on the quotient.
