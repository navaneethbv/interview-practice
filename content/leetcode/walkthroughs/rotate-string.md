## Intuition

Every rotation of `s` appears as a substring of `s + s`, provided the lengths match.
The doubled string contains every possible cut between the first and last character without explicitly trying each rotation.

## Brute force

Building each of the n rotations and comparing it with `goal` takes O(n^2) total character work.
The doubled-string check performs one containment search instead.

## Approach

1. Reject immediately when `s` and `goal` have different lengths.
2. Concatenate `s` with itself.
3. Return whether `goal` occurs in that concatenation.

## Walkthrough

For Example 1, `s = "abcde"` and `goal = "cdeab"`, the lengths match.
The doubled string is `"abcdeabcde"`, which contains `"cdeab"` starting at index 2.
That occurrence corresponds to moving `ab` from the front to the end, so the result is true.

## Complexity

Concatenating creates O(n) characters, and the language substring search is O(n^2) in the worst case for a simple comparison implementation.
The extra string uses O(n) space, excluding implementation-dependent search workspace.

## Edge cases

Equal empty strings would be rotations under the general definition, though the local input constraints use nonempty strings if specified by the tests.
Different lengths always return false before searching.
Zero rotations are included because `s` occurs at the start of `s + s`.

## Common mistakes

Do not search for `goal` in `s` alone, because a rotation can cross the concatenation boundary.
Do not skip the length test, since a shorter string could otherwise occur inside the doubled string.
The operation preserves character order and cannot exchange two adjacent characters arbitrarily.

## Language notes

Python uses the `in` operator, while Java uses `String.contains`.
Both references rely on immutable strings and keep the method contract boolean.
