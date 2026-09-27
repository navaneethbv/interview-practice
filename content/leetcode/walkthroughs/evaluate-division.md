## Intuition

Each equation a divided by b is a directed graph edge from a to b with weight value.
The reverse edge has weight one divided by value.
A path product answers a division query when both variables are connected.

## Brute force

Trying every possible variable sequence for every query can repeat the same graph exploration exponentially.
A visited set prevents cycles during one search.
The graph representation makes each query a bounded traversal over known variables.

## Approach

1. Add both directed weighted edges for every equation.
2. For each query, return -1 when either variable is absent.
3. Start a graph traversal at the numerator with product one.
4. Multiply the running product by each edge weight.
5. Return the product at the target or -1 when no path exists.

## Walkthrough

Example 1 adds a to b with weight 2 and b to c with weight 3.
The query a to c follows both edges and multiplies 2 by 3 to return 6.
The query b to a follows the reverse edge and returns 0.5.
The unknown variable x has no graph entry, so x to x returns -1.

## Complexity

Let V be variables, E equations, and Q queries.
Graph construction uses O(V plus E) space, and each query traversal takes O(V plus E) worst-case time.
The total query bound is O(Q times (V plus E)).
The returned answer array uses O(Q) output space, and each visited set uses O(V) temporary space.

## Edge cases

A variable divided by itself returns 1 when that variable exists.
Unknown variables return -1.
Cycles are safe because each query tracks visited variables.
Reverse edges preserve reciprocal ratios.

## Common mistakes

- Adding only the forward edge makes reverse queries fail.
- Reusing one visited set across queries blocks valid later paths.
- Returning the first edge weight instead of the full path product misses chains.
- Treating unknown x to x as 1 violates the known-variable requirement.

## Language notes

Python uses an adjacency list and iterative stack traversal.
Java uses nested maps and a recursive helper bounded by the number of variables.
Both return doubles and use -1.0 for disconnected queries.
