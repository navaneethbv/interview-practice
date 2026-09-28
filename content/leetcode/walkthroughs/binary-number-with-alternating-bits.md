## Intuition

For an alternating binary number, adjacent bits differ everywhere.
XORing n with n shifted right produces a run of ones exactly when every adjacent pair differs, and a positive run of ones satisfies `x & (x + 1) == 0`.

## Brute force

Reading each bit and comparing it with the previous bit costs O(log n) time and is easy to verify.
The XOR identity compresses the same check into constant machine operations.

## Approach

1. Compute `changed_bits = n ^ (n >> 1)`.
2. Test whether `changed_bits` is a contiguous run of ones with `changed_bits & (changed_bits + 1) == 0`.
3. Return that boolean.

## Walkthrough

For Example 1, n=5 is binary `101`.
The shifted value is `010`, so XOR gives `111`.
`111 & 1000` is zero, which means all adjacent original bits changed and the result is true.

## Complexity

The bitwise formula uses O(1) time and O(1) auxiliary space for fixed-width integers.
The Python and Java references do not allocate a per-bit collection.

## Edge cases

A one-bit number has no adjacent equal pair and returns true.
Numbers such as 7, binary `111`, produce a zero in the XOR at the repeated pair and return false.
The sign bit is outside the positive input contract.

## Common mistakes

Use `n ^ (n >> 1)`, not OR.
The all-ones test must include the zero result from adding one.
Do not treat the decimal digits of n as binary digits.

## Language notes

Python uses arbitrary-size shifts.
Java's method receives a positive `int`, and the loop-free formula avoids signed right-shift concerns for the stated domain.
