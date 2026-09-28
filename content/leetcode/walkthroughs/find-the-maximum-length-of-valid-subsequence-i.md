## Intuition
The valid subsequence condition allows either all even values, all odd values, or an alternating parity sequence.
The best answer is the largest of those three simple candidates.

## Brute force
Enumerating all subsequences is exponential in N.
Counting parity totals and scanning adjacent parity changes gives the three candidate lengths directly.

## Approach
1. Count even values and derive the odd count from N.
2. Scan the original order and extend `alternating_length` whenever neighboring values have different parity.
3. Return the maximum of the even-only, odd-only, and alternating candidates.

## Walkthrough
Example 1 is `[1,2,3,4]`.
There are two even and two odd values, so the uniform candidates both have length 2.
Every neighboring pair changes parity, so the alternating candidate grows from 1 to 4.
The returned maximum is 4.

## Complexity
The two scans are linear, so the time is O(N).
Only counters are stored, giving O(1) auxiliary space beyond the output scalar.
The input order matters only for the alternating candidate, while uniform candidates use counts.

## Edge cases
An all-even or all-odd array is handled by its uniform candidate.
Repeated parity values stop the alternating count at that adjacent pair.
The local constraints provide a nonempty array, so the initial alternating length of one is valid.

## Common mistakes
Counting value changes rather than parity changes misses the definition of the alternating candidate.
Sorting before scanning destroys the original order required by a subsequence.
Returning only the alternating count misses a longer uniform-parity subsequence.

## Language notes
Python uses a generator for the even count and `zip` for adjacent parity comparisons.
Java performs the same two passes with integer counters and no allocation proportional to N.
