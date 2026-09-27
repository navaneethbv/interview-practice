## Intuition
A new occurrence of a value forms one pair with every earlier equal occurrence.
Its current frequency is therefore exactly its new contribution.

## Brute force
Checking all pairs costs O(n^2).
A frequency table counts earlier matches in one pass.

## Approach
1. Initialize counts for values.
2. For each value, add its current count to the answer.
3. Increment its count.
4. Return the total.

## Walkthrough
For Example 1, the second and third 1s contribute 1 and 2 pairs.
The second 3 contributes 1 more, giving 4.
All values in Example 2 are distinct, so every current count is zero and the answer is 0.

## Complexity
The scan takes O(n) time.
The table uses O(u) space for u distinct values, or fixed bounded storage in Java for the stated range.

The same value may contribute on many later visits, and each contribution corresponds to a unique pair whose later index is now being processed.

This ordering also proves there is no double counting: the pair is added only when its second endpoint appears, never when the first endpoint was seen.

## Edge cases
Three equal values contribute 1+2 = 3 pairs.
The count is added before incrementing, preventing self-pairs.

Equivalently, a value with frequency c contributes c times c minus one divided by two after the scan, and the incremental method reaches that same total without a second pass.

## Common mistakes
Do not add after incrementing.
Do not confuse equal values with equal indices.

## Language notes
Python uses a `Counter` and sums combinations from final frequencies.
Java streams values and adds the number of earlier equal values from a fixed integer count array.
