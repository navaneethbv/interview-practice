## Intuition

The task asks for ordinary integer addition.
The reference returns the sum directly and lets the language handle signed values.

## Brute force

Simulating binary addition bit by bit would still produce the same result but adds unnecessary cases for signs.
It is less direct than the contract's arithmetic operation.

## Approach

1. Receive num1 and num2.
2. Add them with the language integer operator.
3. Return the resulting integer.

## Walkthrough

Example 1:

For num1 12 and num2 5, the addition is 12 plus 5.
The returned result is 17.

## Complexity

The references use O(1) algorithmic space.
Arithmetic takes constant time for the bounded machine integers in Java and Python's corresponding integer operation.
No input copy or collection is created.

## Edge cases

Negative operands are accepted by the contract.
Adding zero returns the other operand.
The result follows the judge's integer representation.

## Common mistakes

Do not concatenate the operands as text.
Do not return an absolute value when one operand is negative.
Preserve the required method name sum.

## Language notes

Python returns its arbitrary-precision integer result.
Java returns the int result expected by the harness.
The operation does not need a carry state because the language addition already defines the requested result.
The method therefore mirrors the problem's direct arithmetic contract.
This also keeps the reference aligned with both sample inputs.
No temporary string or array can alter the numeric meaning of either argument.
The returned value is ready for the integer comparator used by the judge.
