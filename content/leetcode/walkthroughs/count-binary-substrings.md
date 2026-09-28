## Intuition

A valid substring must use the end of one run of equal bits and the beginning of the neighboring run.
For adjacent run lengths a and b, exactly `min(a,b)` balanced substrings exist.

## Brute force

Checking every substring and counting its runs takes O(n^2) or worse.
Tracking run lengths compresses all substrings with the same boundary behavior into one arithmetic contribution.

## Approach

1. Track the previous completed run length and the current run length.
2. Extend `currentRunLength` while adjacent characters match.
3. On a bit change, add `min(previousRunLength, currentRunLength)` and move the current run into the previous slot.
4. Add the contribution from the final pair of runs after the scan.

## Walkthrough

For Example 1, `s = "00110011"`, the run lengths are 2, 2, 2, and 2.
The first boundary has no previous run and contributes zero.
Each of the three neighboring run pairs contributes `min(2,2) = 2`.
The total is 6, matching the statement's result.

## Complexity

The string is scanned once, giving O(n) time and O(1) auxiliary space.
The integer answer and run lengths do not depend on storing substring contents.

## Edge cases

A string with only one run has no neighboring run and contributes zero.
Alternating characters create runs of length one, so every boundary contributes one.
The final pair must be added after the loop because no character change triggers it.

## Common mistakes

Do not count all pairs of runs, only adjacent runs.
Use the shorter run length, since a balanced substring cannot consume more characters from either side.
Remember that positions are distinct, so each boundary contribution counts separate substrings.

## Language notes

Python keeps three integer variables, while Java uses descriptive `int` variables with the same invariant.
The stated string bound keeps the result within the local integer return contract.
