## Intuition

Once the current total is known, the particular cards used to reach it no longer affect future draws.
Different prefixes still count separately, but their number of busting continuations is identical.
Store that continuation count once for each total below `stand`.

## Brute force

Recursively try all ten card values after every legal prefix.
This correctly counts ordered sequences but repeats the same remaining-total subproblem exponentially many times.

## Approach

Define `busts(total)` as the number of continuations that eventually bust from a total at which the dealer must still draw.
For every card from 1 through 10, inspect the new total.
A total above `limit` contributes exactly one terminal sequence.
A total below `stand` contributes the recursively computed number of continuations.
A total between `stand` and `limit`, inclusive, contributes zero because the dealer stops safely.
Python memoizes these states; Java fills an array from `stand - 1` down to zero because every dependency has a larger total.
The initial answer is the state for total zero.

## Walkthrough

Example 1 uses `stand = 16` and `limit = 21`.
At total 15, cards 7 through 10 immediately bust, so that state's count is 4.
At total 14, card 1 reaches total 15 and contributes 4, while cards 8 through 10 contribute three immediate busts, yielding 7.
The recurrence continues downward until total zero.
The local example describes this final count symbolically; the same recurrence computes its exact integer value without treating a safe total of 16 as another draw state.

## Complexity

There are `stand` states and ten transitions per state, giving O(stand) time and space in both languages.
Python also has O(stand) recursion depth.

## Edge cases

When `stand = 1`, each sequence contains exactly one card.
A limit at least nine above `stand` makes busting impossible.

## Common mistakes

Never continue drawing after reaching `stand`.
Card order matters, so counting multisets would lose distinct sequences.

## Language notes

Python uses arbitrary-precision integers and `cache`.
Java uses `long` for counts and an iterative table, avoiding recursion depth concerns.
