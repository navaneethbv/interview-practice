## Intuition

The digits at the right end determine whether a carry continues.
A digit below 9 absorbs the carry and ends the operation.
A run of 9s becomes zeroes, and an all-9 input needs one new leading digit.

## Brute force

A naive method could convert the digit list into a numeric value, add one, and convert it back.
That risks integer-size limits and requires extra work to rebuild every digit.
The right-to-left carry scan works directly on the supplied representation.

## Approach

1. Start at the final digit.
2. If it is below 9, increment it and return the same list.
3. If it is 9, write zero and continue left with the carry.
4. When every digit was 9, create a list one position longer and set its first digit to 1.

## Walkthrough

Example 1 is [1, 2, 9].
The last digit is 9, so it becomes 0 and the carry moves to 2.
The 2 is below 9, so it becomes 3 and the scan returns [1, 3, 0].
No new leading digit is needed because the carry has ended.

## Complexity

For n digits, the worst case scans all digits, giving O(n) time.
The normal case uses O(1) auxiliary space and mutates the existing output list.
An all-9 input allocates an O(n) result list because the answer has one extra digit.
The returned list storage is therefore O(n), whether reused or newly allocated.

## Edge cases

A one-digit value below 9 increments in place.
A one-digit 9 returns [1, 0].
A carry can stop at any position.
An all-9 input returns a leading one followed by zeroes.

## Common mistakes

- Scanning from the left misses a carry created by a trailing 9.
- Returning after writing zero to a 9 loses the carry.
- Reusing the old list for all 9s cannot represent the extra leading digit.
- Converting through a machine integer can overflow for long digit lists.

## Language notes

Python returns the original list when the carry ends and creates a new list only for all 9s.
Java follows the same mutation and allocation behavior with int arrays.
Both methods preserve the digits-only representation expected by the judge.
