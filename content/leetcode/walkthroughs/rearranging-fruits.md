## Intuition
The two baskets can be equal only when every fruit's combined count is even.
After balancing counts, the cheaper way to swap a fruit is either direct exchange at its value or two exchanges through the globally cheapest fruit.

## Brute force
Trying every pairing of extra fruits is factorial.
Sorting the required extras pairs the cheapest half with the most expensive half and lets each pair use the cheaper route.

## Approach
1. Compute each value's count difference between the baskets and reject odd differences.
2. Add half of each absolute difference to the extra list.
3. Sort extras and find the global minimum fruit.
4. For the first half of extras, add `min(value, 2*minimum)` as the swap cost.

## Walkthrough
Example 1 has baskets `[4,2,2,2]` and `[1,4,1,2]`.
The count difference requires one 2 to move from the first basket and one 1 to move into it, so the extra list is `[1,2]`.
The global minimum is 1, and swapping through it costs 2 while direct swapping the 1 costs 1.
The answer is 1.

## Complexity
Counting costs O(N) expected time with hash maps, and sorting M extras costs O(M log M).
The extra list and frequency maps use O(N) auxiliary space.

## Edge cases
Any odd combined count makes the exchange impossible and returns -1.
Already equal baskets produce no extras and cost zero.
The two-step route can be cheaper than direct exchange when the global minimum is small.

## Common mistakes
Using only one basket's counts misses values absent from it.
Charging every extra fruit directly ignores the two-step route.
Pairing arbitrary extras can produce a higher cost than sorted pairing.

## Language notes
Python's `Counter` union iterates all values and `basket1 + basket2` creates a temporary list for finding the minimum.
Java tracks differences in a map, stores extras in an `ArrayList`, and accumulates in `long`.
