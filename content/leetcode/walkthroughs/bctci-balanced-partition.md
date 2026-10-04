## Intuition

A balanced parenthesis piece must end when the running number of unmatched opening parentheses returns to zero.
Cutting at every such point gives the maximum number of pieces without affecting the validity of the remaining suffix.

## Brute force

Trying every possible partition would require exponentially many boundary choices.
Even repeatedly checking candidate substrings repeats work that one running depth counter already captures.

## Approach

Initialize `depth` and `pieces` to zero.
For each opening parenthesis, increment depth; for each closing parenthesis, decrement it.
Whenever depth becomes zero after processing a character, increment pieces.
The input is guaranteed balanced, so depth never becomes negative and ends at zero.
Between two successive zero-depth positions, there is no earlier valid cut.
Thus every piece found is indivisible into additional balanced consecutive pieces, and any other valid partition can only merge some of these pieces.

## Walkthrough

```text
Input: s = "((()))(()())()(()(()))"
Output: 4
```

Example 1 separates naturally as `((()))`, `(()())`, `()`, and `(()(()))`.
Depth first returns to zero after the sixth character, then after the twelfth, fourteenth, and final character.
Each return closes one complete piece and increments the count.
Nested parentheses inside a piece do not create an additional boundary while depth remains positive.
The final count is 4.

## Complexity

For n characters, time is O(n).
The algorithmic counters use O(1) working space.
Python iterates over the string directly; the Java reference's `toCharArray()` also allocates O(n) storage.

## Edge cases

The empty string contains zero pieces.
A fully nested string has exactly one piece.
A string of repeated `()` pairs has one piece per pair.

## Common mistakes

Do not count every closing parenthesis as a piece.
Do not increment for the initial empty prefix before reading any character.

## Language notes

Both references rely on the balanced-input guarantee rather than implementing a separate validator.
The equality check must occur after updating depth for the current character.
