## Intuition

A range vote changes the running vote total at two boundaries.
Its value begins contributing at the left endpoint and stops just after the right endpoint, so the entire range need not be updated individually.

## Brute force

Adding each vote to every minute it covers costs O(nq) for n minutes and q votes.
A difference array performs two updates per vote and reconstructs all final values with one prefix scan.

## Approach

Allocate `delta` with n + 1 zeros.
For every `[l, r, v]`, add v at l and subtract v at `r + 1`.
Scan minute indices, accumulate `running += delta[minute]`, and store that running total in `result`.

## Walkthrough

Example 1's positive votes initially give totals `[1, 1, 1, 2, 1, 0]`.
The final vote subtracts one from all six minutes.
The resulting array is `[0, 0, 0, 1, 0, -1]`, including the negative final minute.

## Complexity

Each vote takes constant update time and each minute takes constant reconstruction time, giving O(n + q).
The difference array requires O(n) auxiliary space and the returned result requires O(n) output space.

## Edge cases

With no votes, every minute remains zero.
A single minute vote affects only its selected position.
Overlapping positive and negative votes cancel naturally.
A vote ending at minute n - 1 uses the extra delta entry at n.

## Common mistakes

The right endpoint is inclusive, so the cancellation belongs at `r + 1`.
Do not clamp negative net totals to zero.
At the ending boundary, subtract v even when v is negative; this correctly removes its negative contribution.

## Language notes

Python builds `result` by appending each running total.
Java writes directly into a fixed integer array.
Since each vote is 1 or -1 and there are at most 100,000 votes, all intermediate and final counts fit Java `int`.
