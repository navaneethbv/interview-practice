## Intuition
Each odd seat swaps with the following even seat, and each even seat swaps with the preceding odd seat.
The final seat is special only when the table has odd length, because it has no partner.
A CASE expression can calculate the source seat for every output row.

## Brute force
The query could join `Seat` to itself using paired ids, but it would need separate branches for odd and even rows.
Computing the destination id directly is shorter and preserves one row per seat.

## Approach
1. For an even id, use `id - 1`.
2. For an odd id below the maximum id, use `id + 1`.
3. Keep an unpaired final odd id unchanged.
4. Return the computed id and original student, ordered by the new id.

## Walkthrough
Example 1 has seats 1 Ana, 2 Bo, and 3 Cy.
Seat 1 is odd and below the maximum, so its new id is 2.
Seat 2 is even, so its new id is 1.
Seat 3 is the maximum odd id and remains 3.
Ordering by computed id returns Bo at 1, Ana at 2, and Cy at 3.

## Complexity
The CASE and final ordering cost depend on SQLite's scan and sort plan.
The result contains exactly one row per seat.
No guaranteed sort algorithm is claimed beyond the explicit `ORDER BY` requirement.

## Edge cases
With two seats, the only pair swaps.
With one seat, the maximum odd id remains unchanged.
The query relies on ids being consecutive starting at one, as stated.

## Common mistakes
Swapping an odd final seat with a nonexistent next row creates an invalid id.
Ordering by the original id leaves students in their old positions.
Returning student names without the computed ids loses the assignment mapping.

## SQLite notes
`MAX(id)` identifies whether an odd seat is the unpaired final seat.
SQLite's `%` operator detects even and odd ids.
The outer `ORDER BY id` uses the computed alias and produces ascending final seat order.
