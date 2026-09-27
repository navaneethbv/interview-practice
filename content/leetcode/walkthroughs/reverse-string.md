## Intuition

The first character belongs at the last position, and the last character belongs at the first position.
After swapping that pair, move both boundaries inward.
When the boundaries meet or cross, every pair has been reversed.
The input array is modified directly, so no second character array is needed.

## Brute force

A solution could create a reversed copy by iterating from the last character to the first.
That takes O(n) time but uses O(n) extra space for the copy.
The problem explicitly requires constant additional space, so pairwise swaps are preferable.

## Approach

1. Set left to the first index and right to the last index.
2. While left is less than right, save the left character in temporary.
3. Write the right character into the left position and temporary into the right position.
4. Move left forward and right backward.
5. The method returns nothing because the judge inspects the mutated array.

## Walkthrough

For Example 1, the array is [h,e,l,l,o].
Swap h and o to get [o,e,l,l,h].
Swap e and l to get [o,l,l,e,h].
The two middle l characters meet, so the result is [o,l,l,e,h].
For Example 2, the single a has equal boundaries and remains unchanged.

## Complexity

Each pair is swapped once, giving O(n) time.
The algorithm uses O(1) extra space.
The input array itself holds the result, so no output copy is counted.

## Edge cases

A one-character array needs no swap.
An even-length array has no center character.
An odd-length array leaves its center unchanged.
Spaces, punctuation, digits, and letter case are treated as ordinary characters.

## Common mistakes

Do not return a new array when the contract requires in-place mutation.
Do not move only one boundary after a swap.
Do not continue while left is less than or equal to right, because the center does not need a self-swap.
Do not reverse character values by arithmetic, since the input is a character array.

## Language notes

Python swaps list entries directly with tuple assignment.
Java uses a temporary char variable because arrays store primitive characters.
Both references preserve the required void return behavior.
