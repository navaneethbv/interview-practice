## Intuition

A trip is only known when it ends, so remember where and when each customer checked in, and keep a running total and count per route. The average is then one division.

## Approach

1. On check-in, store `(station, time)` for the customer.
2. On check-out, remove that entry and add the duration to the `(start, end)` route's total and count.
3. On a query, divide the route's total by its count.

## Walkthrough

In Example 1, customer 45 travels Leyton to Waterloo in 12 and customer 10 in 14. The route total is 26 over 2 trips, so the average is 13.

## Complexity

- Time: O(1) per call.
- Space: O(customers + routes).

## Edge cases

- Routes are directional.
- A customer can make several trips over time; the check-in entry is removed at check-out.
- Use floating-point division for the average.

## Common mistakes

- Storing every trip duration and averaging on each query, which costs O(trips) per call.
- Keying the route by the end station only.
- Integer division in Java or C++.
