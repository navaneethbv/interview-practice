## Intuition
An odd decimal substring must end in an odd digit.
The numerically largest valid choice is the longest prefix ending at the rightmost odd digit.

## Brute force
Enumerating all substrings costs quadratic time.
A reverse scan finds the only right boundary needed.

## Approach
1. Scan digits from right to left.
2. Stop at the first odd digit.
3. Return the prefix through that digit.
4. Return the empty string if no odd digit exists.

## Walkthrough
For Example 1, `num = "35420"`.
Digits 0, 2, and 4 are even, and 5 is the rightmost odd digit.
The prefix through it is `"35"`, which is the largest valid odd substring.
For `"4206"`, no odd digit appears, so the result is empty.

## Complexity
The scan takes O(n) time.
The returned prefix may use O(n) output storage, with O(1) auxiliary state.

A shorter substring ending at an earlier odd digit cannot exceed this prefix because the input has no leading zeros and the selected prefix contains every available leading digit.

## Edge cases
A string ending in an odd digit returns the whole string.
A string of only even digits returns `""`.

The scan also preserves leading digits already present in the input because it returns a prefix rather than creating a new reordered number.

## Common mistakes
Return the full prefix, not just the odd digit.
Do not parse a long string as an integer.

## Language notes
Python slices the prefix.
Java uses `substring` with an exclusive end index.
