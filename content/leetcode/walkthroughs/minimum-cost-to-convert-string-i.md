## Intuition
Each character conversion is a shortest path among 26 letters, and the same conversion rules apply independently at every string position.
Floyd-Warshall computes the cheapest cost between every pair, including multi-step conversions, before summing the required positions.

## Brute force
Trying every conversion path separately for every source character can revisit the same letter pairs exponentially.
The fixed alphabet makes a 26 by 26 all-pairs dynamic program practical.

## Approach
1. Initialize letter-to-itself costs to zero and direct rules to their cheapest duplicate cost.
2. For each possible intermediate letter, relax every ordered start and end pair through it.
3. Look up the final cost for each aligned source and target character.
4. Return -1 if any lookup is unreachable; otherwise sum all costs.

## Walkthrough
Example 1 converts `abc` to `cba` with rules `a->b=2`, `b->c=3`, `c->b=4`, and `b->a=1`.
The first position a to c uses a to b to c for cost 5.
The second position b to b costs 0, and the third position c to a uses c to b to a for cost 5.
The total is 10.

## Complexity
Floyd-Warshall costs O(26^3), and matching the strings costs O(L).
The 26 by 26 distance table uses O(26^2) auxiliary space.
Python uses a large integer sentinel, while Java uses a long sentinel to keep cumulative costs safe.

## Edge cases
Equal aligned characters cost zero through the diagonal.
Duplicate direct rules keep only the cheapest price.
If one aligned conversion is unreachable, the whole answer is -1.

## Common mistakes
Using only direct rules misses cheaper multi-step paths.
Allowing an unreachable sentinel to participate in arithmetic can create fake finite paths.
Converting characters independently but forgetting to require equal source and target lengths violates the input contract.

## Language notes
Python indexes letters with `ord` and checks the sentinel after each position.
Java indexes with character subtraction and accumulates in `long` before returning the required type.
