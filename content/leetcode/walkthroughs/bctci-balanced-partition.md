## Intuition

A balanced piece must end where the running parenthesis depth returns to zero.
Every such return offers an independent cut, and taking that cut cannot interfere with the balanced suffix still to be processed.
The input guarantee lets us focus on maximizing pieces rather than validating syntax.

## Brute force

One could try every placement of separators and validate all resulting pieces.
That search has exponentially many partitions.
Repeatedly checking candidate substrings is also unnecessary because one running depth summarizes whether a prefix is balanced.

## Approach

Initialize `depth` and `pieces` to zero.
For each character, add one for an opening parenthesis and subtract one for a closing parenthesis.
Whenever the resulting depth is zero, increase `pieces`.
Between consecutive zero-depth positions the string is balanced, so all counted pieces are valid.
No solution can cut inside such an interval without ending at positive depth, proving that counting every return maximizes the number of pieces.

## Walkthrough

Example 1 is `((()))(()())()(()(()))`.
Its first six characters complete `((()))`, making `pieces` one.
The next six complete `(()())`, and the following two complete `()`.
The remaining `(()(()))` returns to depth zero only at its end.
There are four completed pieces, so the result is 4.

## Complexity

For a string of length n, the scan takes O(n) time.
Python uses O(1) auxiliary space.
Java's `toCharArray()` creates an O(n) character array for this implementation.

## Edge cases

The empty string has zero pieces.
A fully nested string has one piece, whereas a sequence of adjacent `()` pairs has one piece per pair.

## Common mistakes

Count a piece after updating depth for the current character.
Counting every closing parenthesis would incorrectly split nested groups before they are balanced.
Do not require each piece to have length two.

## Language notes

Both references use integer counters and rely on the statement's balanced-input guarantee.
They return a count and never build or store the actual partition strings.
