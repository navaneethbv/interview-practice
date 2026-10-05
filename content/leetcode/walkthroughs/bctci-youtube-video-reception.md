## Intuition

Each day can be reduced to one binary fact: it is positive exactly when likes exceed dislikes.
A prefix sum of these facts lets any inclusive period be answered by subtracting two prefix values.
This moves the repeated work out of the query loop.

## Approach

Start `prefix` with zero positive days before the first day.
For each paired like and dislike count, append the previous prefix plus one when the day is positive, otherwise append the unchanged prefix.
For a period `[l, r]`, subtract `prefix[l]` from `prefix[r + 1]` and collect the result.
The extra prefix entry makes both endpoints inclusive without a special case.

## Walkthrough

In Example 1, day zero is not positive because six is not greater than six, while day one is positive because three exceeds zero.
The prefix values therefore increase at day one and at the other positive days.
The query `[0, 1]` becomes `prefix[2] - prefix[0]` and returns one.
The query `[3, 3]` subtracts adjacent prefix entries and returns one because day three is positive.

## Complexity

Building the prefix array takes `O(n)` time and `O(n)` space.
Each of `q` periods is then answered in `O(1)`, so total time is `O(n + q)`.
The returned counts use `O(q)` additional space, while the prefix structure uses `O(n)`.

## Edge cases

Equal likes and dislikes are not positive because the comparison is strict.
A single-day period works through the `r + 1` prefix boundary.
Periods covering the entire array use the first and last prefix entries directly.

## Common mistakes

Using `>=` incorrectly counts tied days as positive.
Subtracting `prefix[r]` instead of `prefix[r + 1]` excludes the right endpoint.
Recounting each period from scratch can take quadratic time when many queries cover long ranges.

## Language notes

Python builds a list of counts with a list comprehension over the periods.
Java fills an `int[]` result and uses the same prefix indices explicitly.
Both references pair likes and dislikes by index and preserve the period order in the output.
