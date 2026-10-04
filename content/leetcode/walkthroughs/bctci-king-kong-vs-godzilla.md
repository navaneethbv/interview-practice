## Intuition

A building survives when both a shorter predecessor and a taller successor exist.
Monotone stacks reveal those two conditions independently, after which their Boolean results can be combined at each original position.

## Brute force

Scanning every building on both sides of each position takes quadratic time.
Prefix minima and suffix maxima could also solve this unrestricted visibility version, but the supplied references use two monotone stack passes.

## Approach

Scan left to right, removing stack entries whose heights are at least the current value.
A remaining top witnesses a strictly shorter left building.
Clear the stack and scan right to left, removing heights at most the current one, then combine the taller right witness with `answer[index]`.

## Walkthrough

For `[2, 5, 3, 8]`, the left pass marks `[false, true, true, true]`.
On the right, 8 has no successor, while both 3 and 5 have taller building 8 available.
The first building lacks a shorter predecessor, leaving `[false, true, true, false]`.

## Complexity

Each index is pushed once and popped at most once in each pass, giving O(n) time.
The stack uses O(n) auxiliary space and the returned Boolean array uses O(n) output space.
The street itself remains unchanged.

## Edge cases

The first and last buildings cannot survive because one required side is empty.
Equal heights do not satisfy either strict comparison.
A one building street returns false.
Buildings that fail survival still count as potential witnesses for others.

## Common mistakes

Do not progressively remove destroyed buildings from the street.
The reference sets `k` to the full street length, so its distance checks impose no additional visibility restriction.
Reverse the stack comparison correctly for the right to left pass.

## Language notes

Python stores indices in a list and uses `bool` to obtain explicit Boolean results.
Java uses `ArrayDeque<Integer>` and a primitive Boolean array.
Keeping indices rather than heights preserves the exact distance and original position checks.
