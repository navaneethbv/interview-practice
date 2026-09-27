## Intuition

The smallest remaining card cannot be placed after a smaller card because none exists.
It must begin every group that uses it.
Removing all copies of the smallest value from consecutive groups greedily is forced, so a missing successor proves failure immediately.

## Brute force

Trying every assignment of cards to groups can be exponential because duplicate cards create many choices.
Sorting the values and maintaining multiplicities gives a deterministic greedy process.

## Approach

1. Reject hands whose size is not divisible by groupSize.
2. Count every card value in remaining_cards.
3. Visit distinct values in sorted order.
4. For each positive count at first_value, consume that many copies of every value through first_value + groupSize - 1.
5. Return false if any required count is too small, and true after all counts are consumed.

## Walkthrough

Example 1 has hand = [1, 2, 3, 2, 3, 4] and groupSize = 3.
The counts are 1:1, 2:2, 3:2, 4:1.
The smallest value 1 starts one group, consuming one each from 1, 2, and 3.
The remaining counts are 2:1, 3:1, and 4:1.
Value 2 starts the second group, so every card is consumed and the result is true.

## Complexity

- Time: O(n log n), because Python sorts distinct values and Java uses ordered-map operations; every successful inner iteration consumes at least one card, with at most one failed group scan.
- Space: O(n), for the counter and sorted distinct values.

## Edge cases

Group size 1 always succeeds after the divisibility check.
Duplicate values are consumed in batches rather than treated as one card.
A gap anywhere in a required consecutive group returns false.
Very large card values are used as map keys without changing the algorithm.

## Common mistakes

- Starting groups from arbitrary cards can strand the smallest card.
- Checking only divisibility ignores missing consecutive values.
- Deleting a key while iterating directly over the map can corrupt traversal.
- Consuming only one copy when several copies start at the same value undercounts demand.

## Language notes

Python sorts the counter keys and uses Counter default zero behavior.
Java TreeMap.firstKey supplies the next forced start and removes exhausted keys.
