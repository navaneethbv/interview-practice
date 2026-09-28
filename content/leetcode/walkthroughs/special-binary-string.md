## Intuition

A special binary string has equal counts of ones and zeroes, and every prefix has at least as many ones as zeroes.
Its top-level balanced regions are independent special strings, so each can be optimized recursively and the optimized regions can then be sorted in descending lexicographic order.

## Brute force

Trying every legal swap sequence grows rapidly because a swap can expose new valid regions.
The balanced-region decomposition captures all legal rearrangements without enumerating them.

## Approach

1. Scan the string with a balance counter.
2. Every return to zero closes one top-level region `1 + optimized_inside + 0`.
3. Recursively optimize each inside substring.
4. Sort the completed regions in reverse order and concatenate them.

## Walkthrough

For Example 1, `11011000` is one outer balanced region, not two top-level regions.
Its inside substring is `101100`, which splits into special pieces `10` and `1100`.
Sorting those pieces puts `1100` before `10`, so the optimized inside is `110010`.
Wrapping it with the outer `1` and `0` yields `11100100`.

## Complexity

Let L be the input length.
Recursion and substring creation can copy nested ranges at several levels, while sorting sibling regions adds comparison work, so O(L^2 log L) is a safe bound for the string operations.
The recursive strings and region lists use O(L^2) cumulative storage in the worst nested case, with O(L) output length.

## Edge cases

A string with one top-level region still needs recursive optimization of its inside.
Already descending regions remain unchanged.
The balance must return to zero at the full string boundary by the special-string contract.

## Common mistakes

Sort optimized regions, not raw regions.
Keep the outer wrapping `1` and `0` around each recursive result.
Do not sort individual characters, which can break balance prefixes.

## Language notes

Python slices create new strings before recursive calls.
Java uses `substring`, `ArrayList`, and `String.join` to build the same decomposition.
