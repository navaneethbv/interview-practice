## Intuition

The sorted array may keep each value at most twice.
A write pointer marks the retained prefix, and a new value is allowed when it differs from the value two positions behind that prefix.
That comparison prevents a third copy while preserving the first two copies.

## Brute force

A set of counts could record how many copies have been kept, then a separate output list could be rebuilt.
That uses O(n) extra space and needs another pass.
The sorted two-back check enforces the limit in place with constant auxiliary space.

## Approach

1. Start writeIndex at zero.
2. Scan each value in sorted order.
3. Accept the value when fewer than two values are written or it differs from nums[writeIndex minus two].
4. Write accepted values at the next prefix position.
5. Return the prefix length.

## Walkthrough

Example 1 scans [1,1,1,2,2,3].
The first two 1 values are accepted because the prefix has fewer than two entries.
The third 1 equals the value two positions back and is skipped.
Both 2 values and the 3 are accepted, giving prefix [1,1,2,2,3] and length 5.

## Complexity

For n values, the scan takes O(n) time.
The method uses O(1) auxiliary space and writes into the caller's array.
The meaningful output is the returned prefix, whose storage is already part of nums.
Values after that prefix are unspecified.

## Edge cases

An empty array returns zero.
A value appearing once or twice is fully retained.
An all-equal array retains at most its first two copies.
Already valid input is scanned without changing its retained order.

## Common mistakes

- Comparing with the previous value rejects the allowed second copy.
- Comparing with the value two input positions back ignores the compacted prefix.
- Returning the last index instead of the prefix length loses one element.
- Building a set does not preserve the required in-place contract.

## Language notes

Python uses the current read value while writing behind the scan.
Java's enhanced loop has the same safe prefix behavior.
Both methods rely on the statement's sorted-input guarantee.
