## Intuition

The collection behaves like a stack split into capacity-limited substacks.
A push goes to the final substack, while `popAt` can remove from a chosen substack.
The local contract removes empty substacks and does not roll values forward from later substacks.

## Brute force

One flat list could emulate ordinary push and pop, but locating independent substacks after arbitrary `popAt` operations would require tracking the same boundaries separately.
Representing each substack directly keeps those boundaries explicit.

## Approach

Keep `stacks` as an ordered list of nonempty substacks.
Push creates a new final substack only when none exists or the final one is full.
`popAt` first rejects an invalid index with -1, then pops the chosen top value.
If that substack becomes empty, remove its entry from `stacks`.
Ordinary pop delegates to `popAt` using the final index.
`stackCount` returns the current number of nonempty substacks.

## Walkthrough

Example 1 has capacity 2.
Pushing 1, 2, and 3 creates `[[1, 2], [3]]`, so the count is 2.
`popAt(0)` returns 2 and leaves `[[1], [3]]`.
The next pop returns 3 and removes the empty final substack.
The following pop returns 1 and removes the last remaining substack.
The final count is zero.

## Complexity

Push, peek-free ordinary pop, and stack count are O(1) amortized.
`popAt` can take O(s) when removing an empty entry shifts s later substack references.
Stored values and substack metadata occupy O(n) space for n items.

## Edge cases

Pop on an empty collection returns -1.
A capacity of one means every successful pop empties a substack.
Removing an empty middle substack changes subsequent indices.

## Common mistakes

Do not implement rollover from later stacks: that changes the specified behavior.
Do not leave empty substacks counted in `stackCount`.

## Language notes

Python stores lists of lists; Java uses an `ArrayList` of deques.
Their top conventions differ internally, but both return the most recently pushed value within the selected substack.
