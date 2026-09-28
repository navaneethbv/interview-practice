## Intuition

Equality equations form connected components among the 26 lowercase letters.
After merging every equality, an inequality is satisfiable exactly when its two letters have different roots.

## Brute force

Building every implied equality by repeated graph searches repeats work across equations.
Union find compresses all equalities into component representatives.

## Approach

1. Initialize one parent for each letter.
2. Process all `==` equations and union their letters.
3. Process all `!=` equations and reject one whose letters have the same root.
4. Return true if no contradiction is found.

## Walkthrough

For Example 1, `a==b` joins a and b.
The next equation `b!=a` finds the same root for both letters.
That inequality contradicts the component, so the method returns false immediately.

## Complexity

With E equations and a fixed alphabet of 26, the two passes cost O(E) time and the parent array uses O(26) space.
The references use path halving in their parent arrays, although the fixed alphabet already bounds the work tightly.

## Edge cases

`a==a` is harmless, while `a!=a` is immediately contradictory.
Inequalities are checked only after all equalities so transitive connections are known.
Letters absent from every equation remain singleton components.
Repeated equalities and reversed equalities simply find the same roots again.
The fixed alphabet means the parent structure never grows beyond 26 entries.

## Common mistakes

Do not stop after reading only adjacent equalities.
Process all equality equations before testing inequalities.
Use character positions from `'a'` through `'z'` consistently.

## Language notes

Python stores the 26 parents in a list and exposes `_find` as a method.
Java uses an `int[26]` and the same iterative compression rule.
