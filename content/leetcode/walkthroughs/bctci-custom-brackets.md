## Intuition

Proper nesting requires each closing bracket to match the most recent unmatched opening bracket.
Storing the expected closing characters directly turns every closer into a simple comparison with the top of a stack.
Nonbracket characters have no effect on nesting.

## Brute force

Repeatedly delete adjacent matching bracket pairs after filtering ordinary text.
Although conceptually valid, repeated string rebuilding and rescanning can take O(n squared) time.

## Approach

Build `closer_of` from each opening character to its matching closer, and build the `closers` membership set.
Scan `s` once.
An opener pushes its expected closer into `expected`.
A listed closer must find a nonempty stack and equal its popped top; otherwise return false immediately.
Ignore all other characters.
After the scan, return true only if no unmatched opener remains.
The stack represents precisely the unfinished brackets enclosing the current position.

## Walkthrough

Example 1 is `((a+b)*[c-d]-{e/f})` with the usual three bracket types.
The two initial openers push two `)` expectations.
The first inner `)` pops one.
The square-bracket and brace groups each push and pop their own expected closer while arithmetic symbols are ignored.
The final `)` empties the stack, so the answer is true.

## Complexity

For n characters and b bracket types, expected time is O(n + b).
Auxiliary space is O(n + b), including the maximum nesting stack.
Java additionally materializes the string's character array.

## Edge cases

An empty string is balanced.
With no configured brackets, every character is ignored.
A leading closer fails immediately; a trailing unmatched opener fails at the final emptiness check.

## Common mistakes

Matching only aggregate opening and closing counts misses crossed nesting such as `([)]`.
Do not treat every unfamiliar character as a closing bracket.

## Language notes

Python uses a dictionary, a set, and a list stack.
Java uses `HashMap`, `HashSet`, and `ArrayDeque` with the same expected-closer representation.
