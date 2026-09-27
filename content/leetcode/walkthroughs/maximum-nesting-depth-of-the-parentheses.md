## Intuition
The current number of unmatched opening parentheses is exactly the nesting depth at the current position.
An opening parenthesis enters one more level, and a closing parenthesis leaves one level.
The answer is the greatest depth reached anywhere during the scan.

## Brute force
Maintain a stack, pushing for every opening parenthesis and popping for every closing parenthesis.
Track its maximum size.
This takes O(n) time and up to O(n) extra space, but the identities of the opening parentheses are irrelevant.
A counter records all the information the stack would supply.

## Approach
1. Initialize the current depth and greatest depth to zero.
2. For an opening parenthesis, increment depth and update the maximum.
3. For a closing parenthesis, decrement depth.
4. Ignore digits, operators, and other non-parenthesis characters.
5. Return the greatest depth after scanning the expression.

After each position, depth equals the number of opening parentheses encountered minus the number of closing parentheses encountered.
For a valid expression, these are precisely the open enclosing levels.
Updating the maximum on every opening parenthesis captures every possible increase in nesting depth.

## Walkthrough
Example 1 is `(1+(2*3))`.
The first opening parenthesis raises depth to one, so the maximum becomes one.
The digit and plus sign do not change it.
The second opening parenthesis raises depth to two and updates the maximum to two.
The characters `2*3` keep depth unchanged.
The final two closing parentheses lower depth first to one and then to zero.
The method returns the stored maximum, 2.

## Complexity
For an expression of n characters, the scan takes O(n) time.
The two counters occupy O(1) auxiliary space.
Neither implementation allocates a stack, a character-array copy, or substrings.

## Edge cases
An expression without parentheses has depth zero.
Several adjacent parenthesized expressions do not add their depths together.
Nested consecutive openings increase the depth once per character.
The statement guarantees validity, so detecting malformed expressions is outside this method's contract.

## Common mistakes
- Returning the final depth gives zero for every valid expression.
- Counting all opening parentheses confuses total pairs with simultaneous nesting.
- Updating depth for arithmetic operators changes the meaning of the counter.

## Language notes
Python iterates over the string directly.
Java reads characters with `charAt`.
Both counters fit easily in an integer because depth cannot exceed the string length.
