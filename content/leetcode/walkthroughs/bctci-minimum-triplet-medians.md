## Intuition

Every median needs one smaller companion and one larger companion.
Use the smallest two thirds of the sorted values as smaller companion and median pairs, reserving the largest third as the large companions.

## Brute force

Enumerating every partition into triplets creates an enormous number of possibilities.
Sorting exposes a greedy structure: after ordering the chosen medians, the ith median must have enough preceding values to supply all smaller companions.

## Approach

Sort into `ordered` and let `groups = len(arr) // 3`.
Select medians at zero based positions 1, 3, 5, and so on through `2 * groups - 1`.
Sum them; each adjacent earlier value supplies a smaller partner, and the remaining largest values supply larger partners.

## Walkthrough

Example 1 sorts to `[1, 2, 5, 6, 8, 9]` and needs two triplets.
Selected medians are 2 and 6, totaling 8.
One realizing partition is `[1, 2, 8]` and `[5, 6, 9]`, using every original value exactly once.

## Complexity

Sorting dominates at O(n log n) time; summing selected positions takes O(n).
Both references create a sorted copy, requiring O(n) auxiliary space.
The result itself is one integer, but its sum may exceed 32 bit range.

## Edge cases

For three values, the answer is simply their middle value.
The statement guarantees distinct integers and a length divisible by three.
The largest third never contributes directly to the sum, but every such value is still assigned to a triplet.

## Common mistakes

Do not group consecutive sorted triples, which spends unnecessarily large values as later medians.
The selected median spacing is two, not three.
To justify optimality, note that i smallest medians require at least 2i values at or below the ith median.

## Language notes

Python uses `sorted` and arbitrary precision summation.
Java clones before sorting and accumulates in `long`.
Neither reference changes the input, and neither constructs the actual triplet partition because the contract requests only the minimum sum.
