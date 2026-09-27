## Intuition

Postfix notation places an operator after the expressions it combines.
At that point, a stack already contains the values of those expressions.
The top value is the right operand and the next value is the left operand.

## Brute force

One could repeatedly search for a pair of numbers followed by an operator and replace that triple with its result.
Rescanning and shifting a token list can take O(n²) time.
A stack performs the same reductions during one left-to-right scan.

## Approach

1. Use the expression-evaluation stack pattern, beginning with an empty `stack`.
2. Parse each integer token and push its value.
3. For an operator, pop `right` first and then `left`.
4. Apply the operator as `left operator right` through the arithmetic helper.
5. Push the computed result for later operators to consume.
6. Return the sole remaining value after the valid expression ends.

Each stack entry represents a fully evaluated subexpression.
Replacing two entries with their combined result maintains that meaning without needing parentheses or precedence rules.
The problem guarantees that every operator has two available operands and that the expression leaves one result.

## Walkthrough

Example 1 uses `["5", "2", "-", "4", "*"]`.
Stacks are shown from bottom to top.

| Token | Operation | `stack` afterward |
| --- | --- | --- |
| `5` | Push 5 | `[5]` |
| `2` | Push 2 | `[5, 2]` |
| `-` | Compute 5 - 2 | `[3]` |
| `4` | Push 4 | `[3, 4]` |
| `*` | Compute 3 * 4 | `[12]` |

The returned result is 12.
Subtraction illustrates why operand order cannot be reversed.

## Complexity

- Time: O(n) for n tokens, with bounded-width integer parsing and arithmetic under the stated constraints.
- Space: O(n), because an expression may accumulate many operands before reducing them.

## Edge cases

A single integer is already a complete expression.
Negative tokens must be parsed as numbers, not mistaken for the subtraction operator.
Division by zero and arithmetic overflow are excluded by the input contract.
Negative quotients must truncate toward zero.

## Common mistakes

- Popping the left operand first reverses subtraction and division.
- Python floor division alone rounds negative results in the wrong direction.
- Applying infix precedence rules is unnecessary and changes the evaluation order.

## Language notes

Java integer division already truncates toward zero.
Python divides absolute values with `//` and reapplies the sign, avoiding floating-point conversion.
For example, -7 divided by 3 becomes -2 in both versions.
