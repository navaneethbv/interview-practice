## Intuition
The operation count depends on where the smallest and largest characters occur relative to the ends.
A sorted string needs zero, an endpoint extreme needs one, an interior extreme needs two, and the remaining unsorted case needs three unless length two makes it impossible.

## Brute force
Trying all operation sequences is unnecessary because the positions of the extremes determine the known cases.
The reference scans for sortedness and the two extreme characters once.

## Approach
1. Return zero when adjacent characters are already nondecreasing.
2. Return -1 for an unsorted string of length two.
3. Return one when the smallest is first or the largest is last.
4. Return two when either extreme is interior, otherwise return three.

## Walkthrough
Example 1 is `"acb"`.
It is unsorted, has length three, and the largest character c is already interior rather than at the last position.
The smallest character a is at the first position, so one operation suffices and the answer is 1.

## Complexity
The scan and endpoint/interior checks take O(L) time.
Python slices `s[1:-1]` for the interior checks, using O(L) temporary space in the worst case.
Java scans the interior by index and uses O(1) auxiliary space.

## Edge cases
An already sorted string returns zero before position analysis.
The unsorted two-character string cannot be fixed under the operation and returns -1.
Repeated extreme characters use the same positional tests.

## Common mistakes
Returning one whenever an extreme exists ignores whether it is in the movable endpoint position.
Forgetting the length-two exception claims an operation that cannot work.
Checking only the first inversion misses the extreme placement conditions.

## Language notes
Python's `all` and slices make the checks concise but create the noted interior copy.
Java keeps all checks index-based and tracks extremes during one scan.
