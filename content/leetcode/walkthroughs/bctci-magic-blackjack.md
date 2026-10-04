## Intuition

Once the current total is known, earlier cards do not affect the allowed future choices.
Different prefixes may reach the same total, so caching the number of busting continuations avoids recomputing those identical suffix problems.

## Brute force

Enumerating all card sequences grows exponentially because every unfinished sequence has ten possible next draws.
The reference instead counts continuations by total, with only totals below `stand` requiring further decisions.

## Approach

For each card from 1 through 10, compute `new_total`.
If it exceeds `limit`, add one completed busting sequence.
If it remains below `stand`, add the number of busting continuations from there.
Totals from stand through limit stop safely and contribute zero.

## Walkthrough

Example 1 uses stand 16 and limit 21.
From total 15, draws 7 through 10 bust, so `busts(15) = 4`.
From total 14, drawing 1 contributes those four continuations and draws 8 through 10 add three more, giving 7.
Continuing backward produces `busts(0) = 100081`.

## Complexity

There are `stand` unfinished totals, each considering ten card values, so time is O(10 times stand), or O(stand).
The cached table uses O(stand) space.
Python also has a recursion stack of at most O(stand).

## Edge cases

A draw that reaches exactly `stand` stops immediately.
A draw that reaches exactly `limit` is safe.
When stand is one, only the first card is drawn.
If the stopping range is wide enough, no busting sequence exists.

## Common mistakes

Do not keep drawing after a safe stand total.
Count ordered card sequences, not unordered multisets or probabilities.
Every busting final draw contributes one, while unfinished draws contribute all possible future completions.

## Language notes

Python uses `functools.cache` on a recursive helper.
Java fills a `long[]` backward so larger unfinished totals are already available.
The statement guarantees the final sequence count fits signed 64 bit storage.
