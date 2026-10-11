## Intuition

Each query asks for the best item in one group under a fixed ordering, and updates change one item's key. An ordered set per cuisine, keyed by (rating descending, name ascending), keeps the answer at the front.

## Approach

1. Map each food to its rating and its cuisine.
2. For each cuisine keep an ordered set sorted by rating descending, then name.
3. To change a rating, remove the food from its set, update the rating, and reinsert.
4. `highestRated` returns the first element of the cuisine's set.

## Walkthrough

In Example 1, Japanese foods start as miso 12, ramen 14 and sushi 8, so ramen leads. Raising sushi to 16 puts it first. Raising ramen to 16 creates a tie, and ramen wins alphabetically.

## Complexity

- Time: O(log n) per call.
- Space: O(n).

## Edge cases

- Ties are broken by name.
- Lowering the leader's rating can change the answer.

## Common mistakes

- Updating the rating while the food is still inside the ordered set, which corrupts the ordering.
- Scanning all foods of a cuisine per query.

## Reference notes

The Python reference uses a heap with lazy deletion instead of an ordered set: stale entries are skipped when they reach the top.
