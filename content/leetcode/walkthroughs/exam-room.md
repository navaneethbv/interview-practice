## Intuition
An empty room chooses seat 0, while later choices come from the largest edge or internal gap.
The sorted occupied list makes each distance and tie decision explicit.

## Brute force
A naive method tests every vacant seat and scans all k occupied seats to find its nearest neighbor.
For n seats, that costs O(nk) per seating operation.
The reference scans only occupied gaps, but insertion and removal still maintain a sorted list.

## Approach
1. Use seat 0 when no one is seated.
2. Start with the leading gap candidate and inspect each adjacent occupied pair.
3. Compare the trailing gap, replacing only on a strictly larger distance to keep the smallest index on ties.
4. Insert the chosen seat in sorted order, and remove it on `leave`.

## Walkthrough
Example 1 creates a room of size 10.
The first `seat` returns 0 because the room is empty.
The second returns 9 from the trailing edge.
With occupied seats 0 and 9, the middle candidate is 4 with distance 4, so the third returns 4.
The next largest gap is between 0 and 4, whose midpoint 2 has distance 2, so the fourth returns 2.
After seat 4 leaves, the occupied seats are 0, 2, and 9.
The gap from 2 to 9 has midpoint 5 and distance 3, so the final `seat` returns 5.

## Complexity
With k occupied seats, choosing scans O(k) gaps.
Python `insort` adds O(k) list shifting, and `remove` is O(k).
Java's sorted `ArrayList` insertion and removal are also O(k).
The occupied list uses O(k) space.

## Edge cases
For n equal to one, the only seat is reused after leaving.
Ties keep the smaller seat because updates require a strictly larger distance.
A free edge can beat every internal gap.

## Common mistakes
Treating interval endpoints as occupied candidates changes edge distances.
Replacing on equal distance violates the smallest-index tie rule.
Leaving the list unsorted breaks later gap calculations.

## Language notes
Python uses `bisect.insort` for sorted insertion.
Java performs a small linear insertion search and uses `Integer.valueOf` during removal to remove the seat value.
