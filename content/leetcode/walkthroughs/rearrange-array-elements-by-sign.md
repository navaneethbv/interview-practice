## Intuition

The statement guarantees equal counts of positive and negative values and requires stable order within each sign.
Writing positives at even indices and negatives at odd indices while scanning the input preserves both relative orders.

## Brute force

Repeatedly searching for the next unused value of the required sign can take O(n^2) time.
Sorting is also unsuitable because it destroys the original order within each sign.

## Approach

1. Allocate a result array and start `positive_index` at 0 and `negative_index` at 1.
2. Scan `nums` from left to right.
3. Place positive values at the next even index and negative values at the next odd index.
4. Return the filled array.

## Walkthrough

For Example 1, `nums = [3,1,-2,-5,2,-4]`, the first positive 3 goes to index 0.
The next positive 1 goes to index 2, while -2 goes to index 1 and -5 to index 3.
The final positive 2 occupies index 4, and -4 occupies index 5.
The result is `[3,-2,1,-5,2,-4]`, with each sign's original order intact.

## Complexity

The scan visits each value once, so the time complexity is O(n).
The returned array uses O(n) auxiliary space because the method must produce a separate rearrangement.

## Edge cases

The smallest valid input has one positive and one negative value.
The contract excludes zero, so zero never needs a sign decision.
Equal sign counts ensure both index streams finish within the result array.

## Common mistakes

Do not sort the positive and negative subsequences unless you explicitly preserve their input order.
Start negatives at index 1 so the result always begins positive.
Advance each sign pointer by two positions after writing a value.

## Language notes

Python and Java both allocate a result array and use simple integer indices.
The Java method returns `int[]`, preserving the exact input values without conversion or overflow.
