## Intuition

Because the array is sorted, equal values appear in one contiguous run.
A write pointer marks the end of the unique prefix, while the scan reads every original value once.
When a new value appears, writing it at the pointer preserves the required prefix in place.

## Brute force

A naive approach could build a set of seen values and then copy sorted unique values back into nums.
That uses O(n) extra storage and adds a second pass or a sort to reconstruct order.
The write pointer uses the sorted order itself and keeps auxiliary space constant.

## Approach

1. Start writeIndex at zero.
2. Scan each value from left to right.
3. Accept the value when the unique prefix is empty or it differs from the prefix's last value.
4. Write the accepted value at writeIndex and increment the pointer.
5. Return writeIndex as the length of the valid prefix.

## Walkthrough

Example 1 scans [1, 1, 2, 3, 3].
The first 1 is written at position 0.
The second 1 matches the prefix's last value and is skipped.
The 2 and 3 are written at positions 1 and 2, while the final 3 is skipped.
The method returns 3, and the meaningful prefix is [1, 2, 3].

## Complexity

For n array values, each value is inspected once, giving O(n) time.
The method writes only inside nums and uses O(1) auxiliary space.
The prefix itself is part of the caller-owned output array rather than a separate result allocation.
Values after the returned prefix are unspecified by the problem contract.

## Edge cases

An empty array returns zero without indexing it.
An array containing one value returns one.
An all-equal array leaves one representative at the front.
Already unique input is scanned and returned unchanged in content.

## Common mistakes

- Comparing with the previous input index fails after duplicates have been compacted.
- Returning the last write index instead of its length loses one element.
- Allocating a new list breaks the in-place contract.
- Treating values after the returned prefix as meaningful creates false failures.

## Language notes

Python iterates through the original values while writing only behind the current read position.
Java's enhanced loop reads each value before the compacted prefix can overwrite a later position.
Both references return the count expected by the prefix-aware judge.
