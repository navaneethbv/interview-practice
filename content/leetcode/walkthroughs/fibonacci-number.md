## Intuition

The next Fibonacci number is the sum of the previous two.
Only the last two values are needed at any iteration.
Updating two variables from zero and one reaches F(n) without recursion.

## Brute force

The direct recursive recurrence recomputes the same Fibonacci values exponentially.
Memoization reduces time but stores O(n) results.
The rolling pair uses constant space and linear time.

## Approach

1. Initialize previous to F(0) and current to F(1).
2. Repeat n times.
3. Save their sum as the next value.
4. Shift current into previous and next into current.
5. Return previous after n updates.

## Walkthrough

Example 1 asks for F(4).
The pair begins [0,1].
After four updates it becomes [3,5], so previous is 3.
The method returns 3.

## Complexity

The loop takes O(n) time.
Two integer variables use O(1) auxiliary space.
The returned Fibonacci value is a scalar.
The input bound keeps the Java int result valid.

## Edge cases

F(0) returns zero because the loop runs zero times.
F(1) returns one after one update.
The pair update must use the old values simultaneously.
No array or recursive call stack is needed.

## Common mistakes

- Returning current after the loop returns F(n plus one).
- Updating previous before computing the sum loses a term.
- Starting both values at one shifts every result.
- Recursive branching repeats work unnecessarily.

## Language notes

Python tuple assignment updates both rolling values together.
Java stores the sum in a temporary variable before shifting.
Both methods handle n zero directly.
