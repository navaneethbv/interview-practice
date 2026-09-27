## Intuition

Read the input from its least significant bit while building the result from left to right.
Each new input bit is appended after shifting the existing result one position left.
Exactly 32 iterations preserve the leading zeros that belong to the fixed-width representation.

## Approach

1. Use fixed-width bit scanning and initialize `result = 0`.
2. Repeat 32 times: shift `result` left by one and OR in `n & 1`.
3. Shift `n` right by one to expose the next input bit.
4. Return the resulting 32-bit pattern.

After k iterations, the lowest k input bits have been consumed and appear in reversed order in the partial result.
Every iteration adds one more bit to that reversed prefix.
Processing all 32 positions makes this invariant cover the complete input representation, including positions whose bit value is zero.

## Walkthrough

Example 1 uses `n = 1`.
Its 32-bit pattern has 31 leading zeros followed by one.

| Iterations completed | Consumed bit | `result` as unsigned decimal | Remaining `n` |
| --- | --- | --- | --- |
| 0 | None | 0 | 1 |
| 1 | 1 | 1 | 0 |
| 2 | 0 | 2 | 0 |
| 3 | 0 | 4 | 0 |
| 31 | 0 | 1073741824 | 0 |
| 32 | 0 | 2147483648 | 0 |

The remaining zero bits keep shifting the initial one toward the most significant position.
Stopping when `n` first becomes zero would incorrectly return 1.

## Complexity

- Time: O(1), because the loop always performs exactly 32 iterations.
- Space: O(1), holding two fixed-width bit patterns and a loop counter.

## Edge cases

Zero reverses to zero.
A pattern of 32 ones reverses to itself.
Inputs with the highest bit set may arrive as negative Java integers, but their bit patterns still reverse correctly.

## Common mistakes

- Looping only while `n` is nonzero drops required leading positions.
- Reversing decimal digits solves a different problem.
- Treating a negative Java result as an error ignores the unsigned display contract.

## Language notes

Java uses `>>>` to shift zeros into the high positions of `n`.
Python receives a nonnegative unsigned value, so its ordinary right shift suffices.
The Java return type remains `int`; the harness interprets the resulting pattern as unsigned for comparison and display.
Thus Java's signed value -2147483648 represents the displayed answer 2147483648 in Example 1.
