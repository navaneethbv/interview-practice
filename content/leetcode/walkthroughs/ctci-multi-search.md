## Intuition

The small strings often share prefixes, so one trie can represent all of them together.
Starting a trie walk at every position in the big string finds every pattern beginning there.
Terminal markers identify which original small-string entries end at the current trie node.

## Brute force

Search for every small string independently at every possible starting position.
This repeats comparisons for shared prefixes and needs extra care to retain overlapping matches.
A trie shares those prefix comparisons across patterns.

## Approach

Insert each small string into `trie`, recording its input index in the terminal list under `$`.
Create one result list per small string.
For each `start` in the big string, walk forward through trie edges until the next character has no edge.
At every reached terminal node, append start to all associated pattern result lists.
Continue beyond a terminal because a longer small string may share that prefix.

## Walkthrough

Example 1 searches `mississippi`.
Starting at index 1 follows `i` and then `s`, recording both `i` and `is`.
The same patterns match again at index 4.
Starting at 3 finds `sis`; starting at 5 finds `ssippi`; starting at 8 finds `ppi`.
The single-letter `i` also matches at 7 and 10.
No start matches `hi`, so its result remains empty.
The output lists remain aligned with the original `smalls` order.

## Complexity

Let C be total small-string characters, n big-string length, L longest pattern length, and R total matches.
Java takes expected O(C + nL + R) time.
Python creates `big[start:]` slices, adding O(n squared) copying, so its conservative time is O(C + n squared + R).
Trie and results use O(C + R) space, with O(n) temporary suffix space in Python.

## Edge cases

Overlapping matches are retained because every start is tried.
Duplicate small strings share trie paths but keep separate result lists.

## Common mistakes

Stopping at the first terminal loses longer patterns.
Recording the current endpoint instead of start returns incorrect indices.

## Language notes

Python uses nested dictionaries and terminal index lists.
Java uses explicit Node objects with child maps and terminal lists, and scans the big string by index without suffix copies.
