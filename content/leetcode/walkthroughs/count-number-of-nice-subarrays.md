## Intuition
Convert each value to whether it is odd, then count subarrays whose odd count is exactly k.
For a prefix with odd count p, an earlier prefix with count p - k forms a nice subarray ending here.
A frequency table handles repeated prefix counts from even numbers.

## Brute force
Checking the odd count for every start and end pair costs O(N squared).
Prefix frequencies reduce each endpoint to one lookup and make the scan linear.

## Approach
1. Seed prefix odd count zero with frequency one.
2. Scan the array and add `value % 2` to the running odd count.
3. Add the number of earlier prefixes at `odd - k`.
4. Record the current odd count for future endpoints.

## Walkthrough
Example 1 is `[1, 1, 2, 1, 1]` with k equal to 3.
The first two values raise the odd prefix count to 2, and the third value is even so that count remains 2.
The final two 1s raise the count to 3 and 4.
At odd count 3, the prefix count 0 occurs once, and at count 4, the prefix count 1 occurs once, producing two qualifying ranges.

## Complexity
The array is scanned once in O(N) time.
The prefix frequency structure uses O(N) space in the worst case.

## Edge cases
An array with no odd values returns zero for positive k.
When k equals the total odd count, only ranges covering all required odds qualify.
Even values extend a valid range without changing its odd count.

## Common mistakes
Counting total values instead of odd values solves a different problem.
Adding the current prefix before querying counts an empty range.
Using a sliding window without accounting for zero-odd extensions is error-prone.

## Language notes
Python uses a `Counter` with default zero counts.
Java uses an array indexed by possible prefix odd counts, which are bounded by N.
Both return an integer count within the maximum number of subarrays.
