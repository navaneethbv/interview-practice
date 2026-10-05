## Intuition

After each round, the sequence becomes two copies of the previous sequence, with one added to every value in the second copy.
The value at index `n` therefore equals the number of times the binary path to that index chooses the second half.
That count is exactly the number of set bits in `n`.

## Brute force

Generating rounds until index `n` is covered doubles the sequence size each time and can use exponential memory.
Bit counting reads the index directly without constructing any sequence values.

## Approach

1. Start `answer` at zero.
2. Repeatedly clear the lowest set bit of `n` with `n &= n - 1`.
3. Increment `answer` for each cleared bit.
4. Return the total after all bits are cleared.

## Walkthrough

Example 1 asks for index 5, whose binary representation is `101`.
The first `n &= n - 1` changes 5 to 4 and counts one set bit.
The second changes 4 to 0 and counts the second set bit.
The sequence value at index 5 is therefore 2.

## Complexity

- Time: O(popcount(n)), because one loop runs for each set bit.
- Space: O(1), with only the mutable index and answer.

## Edge cases

Index zero has no set bits and returns zero, matching the initial sequence value.
A power of two returns one.
The maximum constraint fits comfortably in a standard signed integer.
The algorithm does not need to know how many rounds contain the index.

## Common mistakes

- Using the index's binary length instead of its number of set bits gives wrong values.
- Constructing the sequence can exceed memory for large indices.
- Clearing bits with arithmetic that does not preserve the remaining index loses the path.
- Treating the input as one-based changes every answer.

## Language notes

Python uses the standard bitwise expression directly on the integer.
Java uses the same expression and returns the number of iterations as an `int`.
Both references rely on the sequence's half-copy recurrence rather than simulation.
