## Intuition
Two separate runs of ones must contain a `0` followed later by a `1`.
Therefore a binary string has at most one one-segment exactly when it does not contain the substring `01`.

## Brute force
Collecting every run and counting them scans the string once but stores run state.
Checking for the forbidden boundary is the same linear scan expressed as a substring test.

## Approach
1. Search for the transition `01`.
2. Return false when it exists because a later one-run starts after a zero.
3. Return true when it does not exist.

## Walkthrough
Example 1 is `"1100"`.
The ones begin at the start and are followed only by zeroes, so there is no `01` transition and the result is true.
Example 2 is `"1001"`, which contains `01` between its two one-runs, so the result is false.

## Complexity
The substring search takes O(L) time and uses O(1) auxiliary space apart from language string-search internals.
No list of runs is built.

## Edge cases
An all-zero or all-one string has at most one segment.
A string beginning with zero can still be valid when its ones are contiguous later.
The transition test handles a one-character string automatically.

## Common mistakes
Searching for `10` instead of `01` rejects valid strings that end their only one-segment.
Counting each one independently mistakes a segment for multiple segments.
Treating adjacent one characters as separate runs ignores their contiguity.

## Language notes
Python uses the `in` operator for the literal transition.
Java uses `String.contains` and negates the result.
