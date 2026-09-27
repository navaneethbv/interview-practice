## Intuition

A triangle path chooses one of two children in the next row.
The cheapest suffix from a position is its value plus the smaller suffix cost below it.
Updating from the bottom upward lets one array represent the row currently being solved.

## Brute force

A recursive path search branches at every row and can explore 2 to the power of row count paths.
Memoization avoids repeated suffixes, but a bottom-up dynamic program is simpler and uses the same recurrence.
The reference computes every triangle position once.

## Approach

1. Copy the final row into minimumTotals.
2. Visit rows from the second-last row toward the top.
3. For each position, add its value to the smaller of its two child costs.
4. Store that result at the same position in minimumTotals.
5. Return the top entry after all rows are folded upward.

## Walkthrough

Example 1 starts with final row [4,1,8,3].
The row [6,5,7] updates to [7,6,10].
The row [3,4] updates to [9,10].
The top value 2 plus the smaller child cost 9 gives 11.
The minimum path sum is therefore 11.

## Complexity

For r rows, the triangle contains O(r squared) positions.
Each position is updated once, so time is O(r squared).
The copied bottom row uses O(r) auxiliary space.
The input triangle remains unchanged, and the returned result is one integer.

## Edge cases

A one-row triangle returns its only value.
Negative values are handled by the same minimum recurrence.
The final row initializes every needed child cost.
The statement supplies a nonempty triangle.

## Common mistakes

- Updating from the top overwrites child costs before both are used.
- Choosing the larger child produces a maximum rather than minimum path.
- Forgetting the bottom-row initialization leaves unreachable sentinels.
- Copying every row uses more space than one bottom-up array.

## Language notes

Python copies the final row with slicing.
Java allocates one array with one extra sentinel slot so index plus one is always valid.
Both references process rows without recursion.
