## Intuition

Every ticket must be used exactly once, so the route is an Eulerian path in a directed multigraph.
When an airport still has an unused destination, follow the lexicographically smallest one.
If a route reaches a dead end, add that airport to the route while backtracking.

## Brute force

Trying every permutation of E tickets and checking whether it forms a route takes O(E × E!) time when each full candidate is checked.
The Eulerian backtracking order consumes each ticket once, while lexical priority chooses the required next destination without enumerating unused permutations.
## Approach

1. Group destinations by source in reverse lexical order.
2. Start stack at JFK.
3. While the top airport has a destination, push the smallest remaining destination.
4. When it has no destination, pop it into route.
5. Reverse route before returning it.

Appending dead ends during backtracking is Hierholzer's algorithm.
The reverse-sorted Python lists let pop remove the smallest destination, while Java's priority queue removes it directly.

## Walkthrough

Example 1 uses tickets = [[JFK, SFO], [SFO, LAX]].

| stack | route | action |
| --- | --- | --- |
| [JFK] | [] | use JFK to SFO |
| [JFK, SFO] | [] | use SFO to LAX |
| [JFK, SFO, LAX] | [] | LAX has no ticket, append LAX |
| [JFK, SFO] | [LAX] | append SFO |
| [JFK] | [LAX, SFO] | append JFK |

Reversing route returns [JFK, SFO, LAX].

## Complexity

Let E be the number of tickets and A the number of airports.
Sorting destinations costs O(E log E), and each ticket is pushed and popped once.
The total time is O(E log E), with O(E + A) graph, stack, and route space.

## Edge cases

Tickets can revisit an airport and can contain parallel edges.
An airport with no outgoing ticket is added only during backtracking.
The required start airport is JFK, so the stack always begins there.
Lexical order is applied whenever several destinations are available.

## Common mistakes

- Appending an airport immediately after entering it can leave unused tickets.
- Sorting the final route does not enforce ticket usage.
- Removing the largest destination first violates lexical order.
- Forgetting the final reverse returns the backtracking order.

## Language notes

Python uses reverse sorting and list pop to obtain the smallest destination.
Java uses PriorityQueue and adds airports to a LinkedList front during backtracking.
Both consume every edge exactly once.
