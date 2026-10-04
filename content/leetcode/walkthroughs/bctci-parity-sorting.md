## Intuition

An even value already at the left side and an odd value already at the right side are correctly placed.
An odd value on the left paired with an even value on the right can be fixed by one swap.
Two inward-moving pointers repeatedly isolate and repair those misplaced pairs.

## Brute force

Collect all even values, then all odd values, and copy the combined result back.
That is linear in time but needs O(n) extra storage, which the in-place requirement avoids.

## Approach

Initialize `left` and `right` to the array endpoints.
If `arr[left]` is even, advance the left pointer.
Otherwise, if `arr[right]` is odd, retreat the right pointer.
When neither condition holds, the left value is odd and the right value is even, so swap them.
The next loop iterations recognize those corrected positions and advance the pointers.
Throughout the loop, everything before `left` is even and everything after `right` is odd.
Once the pointers meet or cross, the remaining single position, if any, can belong to either partition without violating the required order.

## Walkthrough

Example 1 starts with `[1, 2, 3, 4, 5]`.
The left 1 is misplaced, but rightmost 5 is already odd, so the right pointer moves to 4.
Swapping 1 and 4 produces `[4, 2, 3, 1, 5]`.
The left pointer passes the two evens, while the right pointer passes the corrected odd value.
The partition is complete, matching the displayed valid arrangement.

## Complexity

Both pointers move only inward and each swap repairs two boundary values.
Runtime is O(n), and the references use O(1) auxiliary space.
They mutate the provided array rather than returning a new arranged array.

## Edge cases

Empty, singleton, all-even, and all-odd inputs require no special branches.
Negative integers are classified by divisibility exactly like positive integers.

## Common mistakes

The task does not require stable ordering within either parity group.
Use nonzero remainder for oddness rather than assuming every odd remainder equals positive one.

## Language notes

Python swaps with tuple assignment.
Java uses a temporary integer; its negative odd remainders still satisfy the reference's `!= 0` check.
