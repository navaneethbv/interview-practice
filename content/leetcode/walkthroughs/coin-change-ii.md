## Intuition

The order of coins does not matter, so process coin types one at a time.
ways[value] counts combinations using the coin types processed so far.
Reading and writing the array from low to high lets the current coin be reused without creating order-specific duplicates.

## Brute force

Enumerating every multiset of coins whose sum might reach amount can be exponential in amount and requires storing each partial combination.
The one-dimensional dynamic program counts combinations by coin type, reducing the work to O(amount × c) for c coin types.
## Approach

1. Initialize ways[0] to one because there is one way to make amount zero.
2. For each coin, scan values from coin through amount.
3. Add ways[value - coin] to ways[value].
4. Return ways[amount].

When coin is processed, every combination counted at value minus coin can append one coin.
Because earlier coin types are the only outer loop, the same set of coins is never counted in another order.

## Walkthrough

Example 1 uses amount = 5 and coins = [1, 2, 5].

| coin processed | selected ways | ways[5] |
| ---: | --- | ---: |
| none | only amount zero | 0 |
| 1 | five copies of 1 | 1 |
| 2 | add combinations containing 2 | 3 |
| 5 | add the single 5 combination | 4 |

The four combinations are 5, 2+2+1, 2+1+1+1, and five 1s.

## Complexity

Let a be amount and c be the number of coin types.
The nested loops perform O(a × c) updates.
The one-dimensional ways array uses O(a) auxiliary space.

## Edge cases

Amount zero returns one, the empty combination.
A coin larger than amount contributes no updates.
Duplicate coin denominations should not be treated as different types under the problem contract.
An amount that cannot be formed keeps ways[amount] at zero.

## Common mistakes

- Putting amount in the outer loop counts permutations instead of combinations.
- Iterating downward turns unlimited coin use into a one-use selection.
- Starting ways[0] at zero makes every result zero.
- Returning the number of selected coins solves Coin Change rather than this counting problem.

## Language notes

Python stores counts in an integer list.
Java uses a long array during accumulation and clamps to the int return bound.
Both iterate values upward so the current coin may be reused.
