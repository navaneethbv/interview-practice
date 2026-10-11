## Intuition

Boarding follows `turn`, so the bus load after each person is a running total; the answer is the last person whose running total stays within 1000.

## Approach

1. Compute `SUM(weight) OVER (ORDER BY turn)`.
2. Keep rows where the total is at most 1000.
3. Return the one with the largest turn.

## Walkthrough

In Example 1, the order is Alice (250), Alex (600), John Cena (1000), Marie (1200). John Cena is the last to fit.

## Complexity

- Time: O(N log N) to sort N people by turn.
- Space: proportional to the result and any grouping state.

## Edge cases

- A total of exactly 1000 fits.
- The first person always fits.

## Common mistakes

- Ordering by `person_id` instead of `turn`.
- Stopping at the first person who does not fit but returning that person.

## SQLite notes

SQLite supports window functions since version 3.25.
