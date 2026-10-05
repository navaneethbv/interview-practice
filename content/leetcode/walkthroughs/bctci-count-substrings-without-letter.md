## Intuition

Count valid substrings by where they end.
If the current suffix contains `run` consecutive characters other than `a`, exactly `run` valid nonempty substrings end at the current position.
Every substring has one ending position, so adding these counts introduces no duplicates.

## Brute force

Enumerate all start and end positions and check whether each substring contains `a`.
That can take O(n³) with repeated scans, or O(n²) if each start is extended incrementally.

## Approach

Initialize `run = 0` and `answer = 0`.
Read the letters from left to right.
When the letter is `a`, reset `run` to zero because no valid substring can end there.
Otherwise increase `run` by one, extending the uninterrupted suffix that avoids `a`.
Add the resulting `run` to `answer` at every step.
The invariant is that `answer` counts every valid substring ending at any processed position, while `run` describes only the suffix ending at the latest position.

## Walkthrough

Example 1 is `s = "bbac"`.
The first `b` sets `run = 1` and `answer = 1`.
The second `b` sets `run = 2` and `answer = 3`, counting its singleton and `bb`.
The `a` resets `run` to zero without changing the answer.
The final `c` makes `run = 1` and `answer = 4`.
The four occurrences are the two separate `b` singletons, `bb`, and `c`.

## Complexity

The scan takes O(n) time and O(1) auxiliary space.
No substring objects or list of qualifying ranges is created.

## Edge cases

An empty string and a string containing only `a` both return zero.
A length-n string without `a` returns `n(n + 1) / 2`.

## Common mistakes

Count occurrences by position, not distinct substring text.
Resetting only the answer would lose earlier valid substrings.

## Language notes

Python integers grow as required.
Java stores `answer` in a `long` because 100,000 allowed characters can produce more than two billion substrings.
