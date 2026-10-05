## Intuition

Sorted inputs let us identify an element that can no longer match anything in the other array.
Matching equal elements consumes one copy from each array, naturally preserving the required minimum multiplicity of every shared value.

## Brute force

Checking each element against every position in the other array is quadratic and also needs bookkeeping to avoid reusing copies.
A frequency map works, but ignores the ordering already available in the inputs.

## Approach

Keep indices `i` and `j` at the first unconsumed elements.
When values match, append to `common` and advance both.
Otherwise advance only the index holding the smaller value, since all remaining values on the other side are at least its current value.

## Walkthrough

In Example 1, both pointers begin at 1, so append 1.
The next comparison is 2 versus 3, which advances `i`.
Now both values are 3, so append 3 and advance both.
The first array is exhausted, leaving `[1, 3]`.

## Complexity

For input lengths n and m, the pointer scan takes O(n + m) time.
Python uses O(k) result space for k matches and constant other space.
Java allocates a buffer of size min(n, m), then copies the populated prefix.

## Edge cases

If either array is empty, no comparison can produce a match.
Repeated equal values are matched one pair at a time.
Disjoint value ranges return an empty result, and negative values need no special handling.

## Common mistakes

Do not use a set, which would erase duplicate multiplicities.
Advancing both pointers after an unequal comparison could skip a valid match.
Stop as soon as either input ends; remaining values cannot contribute without a partner.

## Language notes

Python grows `common` using `append`.
Java tracks the populated buffer length with `count` and returns `Arrays.copyOf(common, count)`.
Returning the entire Java buffer would expose unused zero entries that are not part of the intersection.
