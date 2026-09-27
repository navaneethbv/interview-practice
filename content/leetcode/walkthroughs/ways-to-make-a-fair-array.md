## Intuition
Removing one element shifts every later element left by one position.
The prefix keeps its original index parity, while the suffix swaps even and odd roles.
Maintaining separate sums for both sides lets us evaluate every possible removal in constant time.

## Brute force
For each index, construct the array with that element removed and recompute its even-indexed and odd-indexed sums.
This takes O(n^2) time and O(n) temporary space.
Prefix and suffix totals avoid copying arrays or rescanning unchanged elements.

## Approach
1. Compute the total sums at original even and odd indices in a two-entry right array.
2. Start both left sums at zero.
3. At each index, subtract the current value from its right sum so it belongs to neither retained side.
4. Compare `leftEven + rightOdd` with `leftOdd + rightEven`.
5. Count equality, then add the current value to its left sum before advancing.

At the comparison point, left contains exactly the unchanged prefix and right exactly the shifted suffix.
The removed value is excluded.
The exchanged suffix parities therefore produce precisely the two sums in the resulting array.

## Walkthrough
Example 1 is `[2,1,6,4]`, whose original parity totals are eight and five.
Removing index zero leaves even and odd sums five and six, so it is not fair.
At index one, left sums are two and zero; after removing the current one, right sums are six and four.
The resulting even sum is `2 + 4 = 6`, and the odd sum is `0 + 6 = 6`, so this removal counts.
Removing index two gives sums six and one; removing index three gives eight and one.
Only one removal works, so the answer is 1.

## Complexity
Two linear scans take O(n) time.
The two pairs of sums and the answer require O(1) auxiliary space.
No prefix arrays or sliced copies are constructed.

## Edge cases
Removing the only element leaves two empty sums, both zero, and counts as fair.
At the first index the prefix is empty; at the last index the suffix is empty.
Neither boundary needs a special branch.

## Common mistakes
- Keeping the suffix's original parity ignores the shift caused by deletion.
- Comparing before subtracting the removed value includes an element that no longer exists.
- Adding the current value to the prefix too early includes it twice in the candidate state.

## Language notes
Both languages store the two parity sums in fixed-size containers.
The local bounds keep total sums at most one billion, within Java `int`.
Both references preserve the input array.
