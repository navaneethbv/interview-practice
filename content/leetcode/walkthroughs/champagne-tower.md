## Intuition
Every glass keeps at most one cup.
Only overflow continues downward, and it splits equally between the two glasses immediately below.
A row-by-row dynamic program keeps the amount arriving at each glass before capping it at one.

## Brute force
Simulating individual drops would repeat the same splitting work and is unnecessary because champagne amounts add linearly.
A full two-dimensional simulation is simple, but storing rows beyond the query row adds no value.

## Approach

1. Start a rolling row with `poured` at the top glass.
2. For each preceding row, create the next row.
3. For each glass, compute `max(0, amount - 1)` overflow.
4. Split half the overflow into each child glass.
5. Return the queried amount capped at 1 after reaching its row.

## Walkthrough

For Example 1, `poured = 2`, `query_row = 1`, and `query_glass = 1`, the top receives 2 cups.
It retains 1 and sends 1 cup of overflow downward.
The two row-one glasses each receive 0.5, so the requested value is 0.5.
With one poured cup, the top is exactly full and has no overflow, so both row-one glasses remain 0.

## Complexity
Using one rolling row through the target takes O(query_row^2) time because there are O(r^2) glasses in the preceding rows.
The rolling row uses O(query_row) auxiliary space.
Amounts can be larger than one before capping, so keep floating-point values during propagation.

## Edge cases
With `poured = 0`, every glass is empty.
The top glass returns 1 for any poured amount at least 1.
The answer is capped at 1 even if a queried glass receives more overflow than its capacity.

## Common mistakes
Do not send the entire amount onward, only the amount above one.
Split overflow by two before adding it to both children.
Use `query_glass` within the requested row rather than treating it as a global index.

## Language notes
Python uses a list of floating-point amounts for the current row.
Java uses a `double[]` rolling row and applies `Math.max` for overflow.
