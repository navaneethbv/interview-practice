## Intuition

A range vote begins contributing at its left endpoint and stops contributing immediately after its right endpoint.
Represent only those two changes instead of updating every covered minute.
A prefix sum then reconstructs the active net contribution at each minute.

## Brute force

For every vote, loop through all covered minutes and add its value.
With v votes spanning a video of n minutes, this can take O(n times v) time.

## Approach

Allocate `delta` with n plus one entries, all zero.
For each `[l, r, v]`, add v at index l and subtract v at index `r + 1`.
The extra entry accommodates intervals ending at the final minute.
Scan real minutes from zero through n minus one, accumulating `running += delta[minute]`.
Append or store running as that minute's net vote count.
Positive and negative votes use exactly the same update rule, since overlapping contributions combine by addition.
The cancellation at `r + 1` removes only that interval's contribution while leaving all other active votes intact.

## Walkthrough

Example 1 combines four votes over six minutes.
The first adds one at minutes three and four, the second at minute zero, and the third at minutes one through three.
The last subtracts one everywhere.
After combining boundary changes, delta over the relevant positions is `[0, 0, 0, 1, -1, -1]`.
Its running sums are `[0, 0, 0, 1, 0, -1]`, matching the returned result.
Minute three retains one positive vote after its two upvotes and one downvote combine.

## Complexity

Recording v votes takes O(v), and reconstruction takes O(n).
Both references therefore run in O(n + v) time and use O(n) space for the difference array and result.

## Edge cases

No votes produces n zeros.
A one-minute range still needs cancellation immediately after that minute.
Net counts may be negative.

## Common mistakes

Subtract at `r + 1`, not r, because the range is inclusive.
Do not output the raw difference array; it stores changes rather than totals.

## Language notes

Python appends running totals to a list.
Java allocates the exact result length; at most 100,000 unit votes fit within signed `int` counts.
