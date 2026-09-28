## Intuition

Printable ASCII uppercase letters are contiguous from A through Z.
Adding 32 maps each to its lowercase counterpart, while all other characters can pass through unchanged.

## Brute force

Calling locale-sensitive case conversion can affect characters outside the required ASCII rule.
Direct range checks preserve digits, punctuation, spaces, and lowercase letters exactly.

## Approach

1. Scan each character.
2. If it lies between A and Z, add 32.
3. Otherwise append it unchanged.
4. Join the result.

## Walkthrough

For Example 1, `Hello` changes H to h and leaves the remaining lowercase letters unchanged.
The output is `hello`.
For `ALREADY 123!`, letters change while the space, digits, and punctuation remain unchanged.

## Complexity

For string length n, time is O(n) and the output builder uses O(n) space.
Neither implementation changes the input string.

## Edge cases

Already lowercase strings are unchanged.
Digits and punctuation are preserved.
An uppercase Z maps to z through the same offset.

## Common mistakes

Do not lowercase punctuation or digits.
Use ASCII bounds, not numeric parity.
Preserve spaces and original order.

## Language notes

Python builds a character list before joining.
Java uses `StringBuilder` and appends one character at a time.
The ASCII offset is applied only inside the uppercase interval, so nonletters cannot be changed accidentally.
Character order and string length remain unchanged.
The transformation is deterministic for every printable ASCII input.
The output has the same number of characters as the input.
Only ASCII uppercase letters receive a numeric offset.
Punctuation remains byte-for-byte unchanged.
