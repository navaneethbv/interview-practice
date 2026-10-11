## Intuition

A policy qualifies by two independent tests on the whole table: its 2015 value must repeat, and its location must not.

## Approach

1. For each policy, count policies with the same `tiv_2015`; require more than one.
2. Count policies at the same `(lat, lon)`; require exactly one.
3. Sum `tiv_2016` over qualifying policies and round to two decimals.

## Walkthrough

In Example 1, policies 1, 3 and 4 share `tiv_2015 = 10`. Policies 2 and 3 share a location, so policy 3 is excluded. Policies 1 and 4 qualify: 5 + 40 = 45.

## Complexity

- Time: O(N^2) with correlated counts, or O(N log N) with grouped counts joined back.
- Space: proportional to the result and any grouping state.

## Edge cases

- If nothing qualifies, `SUM` returns null.
- Location uniqueness compares both coordinates together.

## Common mistakes

- Checking latitude and longitude uniqueness separately.
- Excluding the policy itself from the repeat count (it must equal at least one other policy, so the count including itself must exceed one).

## SQLite notes

Values are REAL here; `ROUND` gives two decimals.
