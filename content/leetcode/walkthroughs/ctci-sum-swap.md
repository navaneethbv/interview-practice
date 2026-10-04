## Intuition

Swapping x from a with y from b changes the first sum by y minus x and the second by x minus y.
Equating the new sums yields `x - y = (sum(a) - sum(b)) / 2`.
This turns a search over pairs into a lookup for one required complement.

## Brute force

Try every pair of elements and compare the two resulting sums.
Even with the original sums precomputed, this costs O(nm) pair checks for arrays of lengths n and m.

## Approach

Calculate `difference` between the sums.
If it is odd, return an empty list because integer values cannot satisfy the half-difference equation.
Set `shift` to half the difference and store b's values in a set.
Visit a's distinct values in sorted order; for each x, check whether `x - shift` appears in b.
Return the first matching pair, or an empty list if none exists.
Sorting implements the required deterministic preference for the smaller first value.

## Walkthrough

Example 1 has sums 11 and 15, so difference is -4 and shift is -2.
The sorted distinct a candidates begin with 1.
Its required counterpart is `1 - (-2) = 3`, which exists in b.
Swapping them raises a's sum to 13 and lowers b's sum to 13.
Return `[1, 3]`.

## Complexity

For u distinct values in a, Python takes expected O(n + m + u log u) time and O(u + m) space.
Java sorts a full clone, so its bound is O(n log n + m) time with O(n + m) space.

## Edge cases

Equal sums require a shared value if exactly one pair must be exchanged.
An even difference is necessary but does not guarantee that a matching pair exists.
Negative values obey the same equation.

## Common mistakes

Using the full difference instead of half overshoots the needed correction.
Returning values in reversed array order violates the pair contract.

## Language notes

Python sums use arbitrary precision.
Java computes the difference and set complements with long arithmetic to avoid overflow when summing int-valued arrays.
