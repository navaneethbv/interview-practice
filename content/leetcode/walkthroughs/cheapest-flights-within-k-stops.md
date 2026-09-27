## Intuition

At most k stops means a route may use at most k + 1 flights.
After one pass over all flights, updated prices describe routes using one additional flight.
Keeping a copy for the next pass prevents one pass from chaining several flights accidentally.

## Brute force

Enumerating every route with at most k + 1 flights can take O(n^(k + 1)) time in a dense graph and stores the current route.
The bounded dynamic program keeps only the cheapest cost for each city at each flight count, reducing the work to O((k + 1) × (n + E)), including copying the previous cost array.
## Approach

1. Initialize costs to infinity and set the source cost to zero.
2. Repeat k + 1 times.
3. Copy costs into updated_costs.
4. For every flight, relax its destination using only the previous pass's costs.
5. Replace costs with updated_costs and return the destination price or -1.

The copied array represents the previous flight-count layer.
This is a bounded Bellman-Ford dynamic program rather than unrestricted shortest path search.

## Walkthrough

Example 1 uses flights = [[0, 1, 2], [1, 2, 2], [0, 2, 9]], source 0, destination 2, and k = 1.

| pass | routes allowed | destination cost |
| ---: | --- | ---: |
| start | zero flights | infinity |
| 1 | one flight | 9 |
| 2 | two flights | 4 |

The two-flight route through city 1 costs 2 + 2 = 4 and is cheaper than the direct flight.

## Complexity

Let E be the number of flights.
The algorithm performs k + 1 passes, each copying n costs and scanning E flights, so time is O((k + 1) × (n + E)).
The two cost arrays use O(n) auxiliary space.

## Edge cases

If the destination is unreachable within the flight limit, the answer is -1.
A direct flight is allowed when k is zero.
The source starts with cost zero and needs no flight.
Routes with more than k + 1 flights never enter the updated state.

## Common mistakes

- Updating costs in place allows more flights in one pass.
- Treating k as the number of flights allows one extra edge.
- Returning an unrestricted cheapest route can violate the stop limit.
- Adding an unreachable sentinel without guarding it can overflow in Java.

## Language notes

Python uses float infinity and copies the list for every layer.
Java uses Integer.MAX_VALUE and skips unreachable sources before adding a price.
Both preserve the same previous-layer transition.
