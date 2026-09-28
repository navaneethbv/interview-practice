## Intuition
A valid constructed string ends with either a block of zero zeros or a block of one ones.
Removing that final block leaves a shorter constructible string.
Counting strings by their lengths gives a dynamic program without generating the actual strings.

## Brute force
Recursively append each possible block until the length exceeds high, counting strings whose lengths fall in the requested interval.
The construction tree can have exponentially many nodes, with a loose O(high*2^high) time bound when copying strings is included.
Many branches reach the same length, which the dynamic program combines.

## Approach
1. Allocate `ways` for lengths zero through high and set `ways[0] = 1` for the empty construction.
2. Process positive lengths in increasing order.
3. If a zero block fits, add the count for length minus zero.
4. If a one block fits, add the count for length minus one.
5. Reduce the new count modulo 1,000,000,007 and add it to the answer when the length is at least low.
6. Return the accumulated answer modulo the same value.

The two predecessor classes are disjoint because their strings end in different characters.
Within either class, removing the known final block gives a unique predecessor.
Both blocks have positive length, so every dependency was already computed at a smaller length.

## Walkthrough
Example 1 uses `low = high = 2` and `zero = one = 1`.
The empty length has one construction.
Length one receives one predecessor from each block type, producing two strings, 0 and 1.
Length two receives those two counts twice, producing four strings: 00, 01, 10, and 11.
Only length two is inside the requested interval, so the answer is 4.

## Complexity
Each length uses constant work, giving O(high) time.
The table requires O(high) auxiliary space.
No strings or slices of the table are built, and the answer is accumulated during the same scan.

## Edge cases
Equal block lengths still represent two different characters and must contribute separately.
Unreachable lengths retain count zero.
The empty construction initializes the recurrence but is not counted in the answer because low is positive.

## Common mistakes
- Setting the empty-length count to zero prevents every later construction.
- Treating equal block sizes as one choice loses distinct strings.
- Delaying all modular reduction can create unnecessarily large intermediate values.

## Language notes
Both languages reduce each table count and answer update modulo the required value.
Java adds at most two already reduced counts at a time, so the intermediate sum remains below `Integer.MAX_VALUE`.
