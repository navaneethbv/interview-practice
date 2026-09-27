## Intuition
Only the two exchanged boxes change the totals.
If Alice gives size a and receives size b, her total increases by b minus a while Bob's decreases by the same amount.
Equalizing the totals therefore fixes the difference between the two chosen box sizes.

## Brute force
Try every Alice box with every Bob box and check the resulting totals.
After computing the totals once, this needs O(A*B) comparisons for array lengths A and B.
A set of Bob's sizes answers each required-size lookup in expected constant time.

## Approach
1. Compute `difference = (Bob total - Alice total) / 2`.
2. Put every Bob box size into `available`.
3. For each Alice box, calculate the required Bob size as `alice_box + difference`.
4. Return the first pair whose Bob size is present.

The equality follows from `Alice total - a + b = Bob total - b + a`.
Rearranging gives `2*(b-a) = Bob total - Alice total`.
The guaranteed existence of a valid swap ensures that the total difference is even and that a matching pair is found.

## Walkthrough
Example 1 gives Alice `[1,1]` and Bob `[2,2]`.
Their totals are 2 and 4, so `difference` is 1.
The set `available` contains size 2.
For Alice's first box of size 1, the required Bob size is `1 + 1 = 2`, which exists.
The result is `[1,2]`.
After exchanging those boxes, Alice has total `2 - 1 + 2 = 3` and Bob has `4 - 2 + 1 = 3`.

## Complexity
Computing totals, building the set, and scanning Alice's boxes take expected O(A+B) time.
The set uses O(B) auxiliary space in the worst case.
The returned pair uses O(1) space.

## Edge cases
Repeated sizes need only one set entry because the exchange uses one box from each person.
A negative difference correctly requests a smaller Bob box when Alice starts with more candy.
Multiple valid exchanges are accepted by the validator.

## Common mistakes
- Reversing the difference sign requests the wrong partner box.
- Forgetting the division by two overcorrects the total imbalance.
- Removing duplicates from the original arrays before summing changes their totals.

## Language notes
Python uses integer division, which is exact here because a solution exists.
Java's signed integer sums are safe under the local maximum of 10000 boxes of size 100000.
The final empty result is a defensive fallback outside the guaranteed-solution contract.
