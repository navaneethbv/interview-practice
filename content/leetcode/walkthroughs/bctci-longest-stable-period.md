## Intuition

A period is stable exactly when its maximum minus minimum stays within t.
Two monotone deques provide those extrema while a sliding left boundary removes days until the period becomes stable again.

## Brute force

Checking every interval's minimum and maximum takes at least quadratic time.
Rescanning a window after each boundary change also wastes work on unchanged values.

## Approach

Maintain low with increasing candidate temperatures and high with decreasing candidates, storing indices in both.
When adding right, remove dominated trailing entries and append its index.
While the front maximum minus front minimum exceeds t, remove left from either front if present, then increment left.
Update best after stability is restored.
Removing elements cannot increase the range, so shrinking is valid; dominated candidates can be discarded because a newer equally useful candidate expires later.

## Walkthrough

```text
Input: [[3, 1, 6, 2], 3]
Output: 2
```

Example 1 starts with `[3, 1]`, whose range is 2 and length is 2.
Adding 6 gives range 5, exceeding t = 3.
Removing 3 leaves `[1, 6]`, still too wide, so remove 1 as well.
Adding 2 to `[6]` gives range 4, requiring another shrink.
No later window beats the saved length 2.

## Complexity

Every index enters and leaves each deque at most once, giving O(n) total time.
Deque storage is O(n) in the general worst-case bound.
Only indices are stored; temperatures remain in the input array.

## Edge cases

With t equal to zero, only equal-temperature runs qualify.
Negative values require no special logic.
At least a singleton is always stable for nonnegative t.

## Common mistakes

Shrink with a while loop because removing one day may not restore stability.
Do not compare only neighboring temperatures; the whole-window range is required.

## Language notes

Python uses deque endpoint methods.
Java uses ArrayDeque with equivalent first and last operations; bounded temperatures keep range subtraction safely within int.
