## Intuition
Recoloring changes the number of distinct colors only when a color gains its first ball or loses its last ball.
Track each colored ball's current color and each active color's number of balls.
The number of entries in the color-count map is then the answer after every query.

## Brute force
After each recoloring, scan all currently colored balls and construct a set of their colors.
With Q queries, there can be O(Q) colored balls, giving O(Q^2) total work and O(Q) space.
Updating only the old and new colors avoids those repeated scans.

## Approach
1. Maintain a map from ball labels to colors and a second map from colors to positive occurrence counts.
2. If the queried ball was already colored, decrement its previous color's count.
3. Remove that color entry if its count reaches zero.
4. Record the ball's new color and increment the corresponding count.
5. Append the number of active color entries to the result.

After each query, every colored ball contributes exactly one count to its current color.
Deleting zero-count entries ensures the map contains precisely the colors still represented by at least one ball.
Taking its size therefore gives the required distinct count.

## Walkthrough
Example 1 uses `limit = 3` and queries `[[0,1],[1,2],[0,2]]`.
The first query gives ball zero color one, so there is one active color.
The second gives ball one color two, leaving both colors active and producing two.
The third recolors ball zero from one to two.
Color one's count falls to zero and its entry is removed; color two's count becomes two.
The result is `[1,2,1]`.

## Complexity
Each query performs a constant number of hash-map operations, giving expected O(Q) time.
The maps use O(Q) auxiliary space, bounded more tightly by the number of balls actually colored.
The returned list separately occupies O(Q) space.
No array proportional to limit is allocated, which matters when labels range up to one billion.

## Edge cases
Assigning a ball its existing color leaves the final distinct count unchanged.
Removing one ball from a color shared by other balls does not remove that color.
Uncolored balls contribute no color at all.

## Common mistakes
- Keeping zero-count entries makes the map size overcount active colors.
- Counting recoloring operations instead of represented colors confuses history with current state.
- Allocating storage for every possible label wastes space when few balls are queried.

## Language notes
Python uses a dictionary and `Counter`, explicitly deleting zero counts.
Java uses two maps, a helper for removing an old contribution, and an integer result array.
The limit parameter defines valid labels but is not needed for sparse storage.
