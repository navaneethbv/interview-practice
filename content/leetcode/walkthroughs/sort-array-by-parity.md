## Intuition
The output needs only two groups: even values followed by odd values.
There is no requirement to compare magnitudes within a group.
Copying the two groups in separate passes is enough and naturally preserves every occurrence.

## Brute force
Sort the array using parity as the primary comparison key.
A comparison sort can require O(n log n) time for n values, even though only two categories matter.
Direct partitioning handles the same requirement in linear time.

## Approach
1. Create an empty output list or an output array of length n.
2. Scan `nums` and copy each value whose remainder modulo two is zero.
3. Scan again and append each value whose remainder is nonzero.
4. Return the result after both passes.

After the first pass, the output contains exactly the original even values.
The second pass cannot introduce an even value after an odd one because it copies only odd values.
Every input occurrence passes exactly one of the two conditions, proving that the result is a permutation of the input.
These references also preserve order within each group, although the validator does not require that additional property.

## Walkthrough
Example 1 is `[3,2,1,4]`.
The first pass skips 3, copies 2, skips 1, and copies 4, giving `[2,4]`.
The second pass appends 3 and then 1.
The final result is `[2,4,3,1]`.
The input array remains unchanged throughout both scans.
Java's `nextIndex` progresses from zero to two during the first pass and then reaches four.

## Complexity
Two scans take O(n) time.
The returned list or array occupies O(n) space.
Apart from that output, the references use O(1) auxiliary state.
They do not allocate two temporary parity lists and concatenate them.

## Edge cases
Zero belongs to the even group.
An already partitioned input remains valid after copying.
If every number has the same parity, one pass writes nothing and the other copies all values.
Duplicate values retain their original multiplicities.

## Common mistakes
- Sorting by numerical value does not necessarily group parity correctly.
- Treating zero as odd contradicts the remainder test.
- Using a set to build the output loses duplicate occurrences.

## Language notes
Python appends to a list using amortized constant-time operations.
Java allocates the exact output length and tracks the next writable index.
An in-place two-pointer partition could save output allocation, but these references deliberately return a separate array.
