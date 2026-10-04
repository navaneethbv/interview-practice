## Intuition

Every valid partition has a unique final palindrome piece.
If that piece begins at a known position, the preceding prefix can be partitioned independently.
Counting partitions by their last piece yields a dynamic program once palindrome substrings can be queried quickly.

## Brute force

Choose whether to cut at every gap, then test all resulting pieces.
There are exponentially many cut patterns, and the same substrings are checked repeatedly.

## Approach

Build `palindrome[start][end]` by matching endpoint characters and checking the enclosed substring.
Lengths one and two need no inner-table lookup.
Process starts backward so the needed inner entries already exist.
Next let `ways[end]` count partitions of the prefix ending just before `end`.
Initialize `ways[0]` to one, representing the empty prefix before the first piece.
For every possible final-piece start, add `ways[start]` when the substring through `end - 1` is palindromic.
Reduce each completed prefix total modulo 1,000,000,007.
The separately handled empty input returns zero as required by the external contract.

## Walkthrough

Example 1 uses `abbaab`.
The prefix counts, including the initial empty prefix, are `[1, 1, 1, 2, 3, 5, 6]`.
The prefix `abbaa` has five partitions: three ending with singleton `a` and two ending with `aa`.
At the final `b`, a singleton final piece contributes those five partitions.
The palindrome `baab`, starting at index two, contributes the one partition of prefix `ab`.
These disjoint choices for the final piece give six total partitions.

## Complexity

Both tables take O(n squared) time overall.
The palindrome table requires O(n squared) space, and prefix counts add O(n).

## Edge cases

A nonempty single character has one split.
Repeated equal characters permit every cut pattern.

## Common mistakes

Do not initialize `ways[0]` to zero, which would erase every count.
Apply the requested modulo rather than returning an unbounded count.

## Language notes

Python sums a generator of qualifying prefix counts.
Java accumulates in `long`; its at-most-2000 reduced terms fit safely before each modulo.
