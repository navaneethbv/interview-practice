## Intuition

A recursive search chooses where the next operand ends and which operator joins it to the expression.
The running value handles addition and subtraction immediately.
Multiplication needs to replace the previous operand's contribution, so the state also stores last_operand.
This correction gives multiplication its normal precedence without building a parser.

## Brute force

For a string of n digits, a naive search can choose a cut or no cut at each gap and one of three operators at each cut.
There are exponentially many expressions, and evaluating every completed expression costs up to O(n).
The search still has exponential worst-case output-sensitive work, but it rejects leading-zero operands during construction.

## Approach

1. At each index, try every next digit as the end of the operand.
2. Stop extending when a multi-digit operand would begin with zero.
3. For the first operand, start the expression without an operator.
4. For later operands, recurse for plus, minus, and multiply.
5. For multiplication, replace last_operand in value with last_operand times operand.
6. Store an expression when all digits are consumed and value equals target.

## Walkthrough

For Example 1, num is 123 and target is 6.
The search builds 1, then tries 2 and 3 with each operator.
The plus branch reaches 1+2+3 with value 6.
The multiply branch reaches 1*2*3 with value 6 through the previous-operand correction.
Both expressions are returned.
For Example 2, the branch starting with 10 is allowed, but the branch using 05 is stopped by the leading-zero rule.
The valid results are 1*0+5 and 10-5.

## Complexity

Each digit gap has four possibilities: concatenate or insert one of three operators.
There are O(4^n) search nodes, each doing at most O(n) string construction and parsing work, for an O(n * 4^n) time bound.
Retained immutable expression strings use O(n²) live auxiliary space across recursive frames, including the O(n) call stack.
Returned output storage is O(nR) for R results.
Java uses long intermediate values to avoid narrowing during expression evaluation.

## Edge cases

A single zero can form the operand 0.
Leading-zero strings can still use a standalone zero before another operator.
An expression may contain no operator when the whole number equals target.
Negative targets are compared with the signed running value.

## Common mistakes

Do not evaluate multiplication as value times operand without removing the previous operand.
Do not allow tokens such as 05.
Do not use int for every intermediate Java product, because a ten-digit token can exceed int.
Do not stop after the first matching expression.

## Language notes

Python recursion uses arbitrary-precision integers.
Java parses tokens as long and compares the final value with the int target.
The public method is small, while the recursive helper owns the branching logic.
