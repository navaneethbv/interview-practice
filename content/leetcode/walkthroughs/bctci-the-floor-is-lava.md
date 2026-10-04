## Intuition

Treat each furniture rectangle as a graph vertex and every feasible jump as an undirected edge.
Reachability then becomes a graph search, with geometric distance evaluated only when considering another piece.

## Brute force

Enumerating complete jump sequences repeats visits and can loop among nearby pieces.
A visited array records reachable furniture once and prevents redundant exploration.

## Approach

For rectangles a and b, compute their horizontal separation as the maximum of zero and the two possible directional gaps.
Compute vertical separation similarly.
The closest-point squared distance is `dx * dx + dy * dy`.
Run BFS from piece zero, testing every unreached rectangle against each dequeued piece and enqueuing it when squared distance is at most d squared.
Return whether the last piece was reached.
Overlapping coordinate projections contribute zero separation on that axis.

## Walkthrough

```text
Input: furniture = [[1, 1, 9, 5], [12, 9, 20, 13], [16, 2, 22, 7], [24, 9, 26, 11], [29, 1, 31, 5]], d = 5
Output: true
```

Example 1 can jump from piece 0 to 1 with gaps 3 and 4, giving distance 5.
Piece 1 can reach piece 3 with horizontal gap 4 and overlapping vertical projections.
Piece 3 can reach piece 4 with gaps 3 and 4, again distance 5.
Thus the route 0, 1, 3, 4 reaches the destination within the allowed jump distance.

## Complexity

With n pieces, at most n BFS removals each scan n candidates, giving O(n squared) time.
The reached array and queue use O(n) extra space.
No complete adjacency matrix is stored.

## Edge cases

A single piece is already the destination.
Touching pieces have distance zero.
Diagonal separation must combine both axis gaps, while alignment can leave one gap zero.

## Common mistakes

Comparing rectangle centers gives incorrect distances for large furniture.
Use less-than-or-equal so jumps exactly at the limit remain valid.

## Language notes

Python integers safely hold squared distances.
Java promotes gaps and the jump limit to long before multiplication, keeping the squared-coordinate arithmetic within range.
