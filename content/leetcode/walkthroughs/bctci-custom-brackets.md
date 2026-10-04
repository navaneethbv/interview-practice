## Intuition

Nested brackets must close in the reverse order in which they opened.
Store the expected closing characters on a stack, so every actual closer can be checked against the innermost unmatched opener.

## Brute force

Repeatedly removing matching adjacent bracket pairs can take quadratic time and requires first separating irrelevant characters.
One stack pass validates nesting directly.

## Approach

Build `closer_of` from opener to matching closer and a set containing all closing characters.
For an opener, push its expected closer.
For a closer, reject if the stack is empty or its popped character differs.
Ignore characters in neither collection.
After scanning the string, return true only if the stack is empty.
The uniqueness guarantee across bracket definitions ensures a character never has conflicting roles.

## Walkthrough

```text
Input: s = "((a+b)*[c-d]-{e/f})", brackets = ["()", "[]", "{}"]
Output: true
```

Example 1 starts by pushing two expected right parentheses.
The inner expression closes one of them.
The square-bracket expression pushes and then consumes its matching square closer, followed similarly by the brace expression.
Letters and arithmetic symbols do not affect the stack.
The final right parenthesis consumes the remaining expectation, leaving the stack empty and the result true.

## Complexity

For n string characters and b bracket definitions, expected time is O(n + b).
The mapping uses O(b) space and the stack can use O(n) space for deeply nested input.
Java also creates a character array while iterating.

## Edge cases

An empty string is balanced.
With no bracket definitions, all characters are ignored.
A leading closer fails immediately, while trailing unmatched openers fail at the final check.

## Common mistakes

Equal counts of each bracket type do not prove correct nesting.
For example, `([)]` has matching counts but the wrong closing order.

## Language notes

Python's expected list and Java's ArrayDeque implement the same last-in-first-out rule.
Java compares primitive char values after popping, so character matching uses values rather than object identity.
