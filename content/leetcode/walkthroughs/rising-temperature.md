## Intuition

A row is selected when its temperature is higher than the previous calendar day.
The Weather table can be joined to itself by comparing the current date with the prior date.
Date arithmetic expresses the one-day relationship without relying on row ids being consecutive.

## Brute force

A client-side scan could sort all rows and compare neighboring dates.
That transfers table data out of SQLite and assumes the input order already represents dates.
A self-join lets SQLite apply the date relationship directly.

## Approach

1. Alias the current day as a and the prior day as b.
2. Join b.recordDate to date(a.recordDate, minus one day).
3. Keep rows where a.temperature exceeds b.temperature.
4. Select the current row id.

## Walkthrough

Example 1 has March 1 at 10 degrees and March 2 at 12 degrees.
The join matches March 2 with March 1 because subtracting one day from March 2 gives March 1.
Since 12 is greater than 10, id 2 is returned.
March 4 has no March 3 row, so it produces no match.

## Complexity

With W weather rows and no supporting date index, a nested-loop self-join can take O(W squared) time.
An index on recordDate can improve the physical plan, while join workspace and output storage depend on SQLite's chosen plan.
The query emits ids and does not modify Weather.

## Edge cases

A missing previous calendar date produces no result.
Equal temperatures are not rising.
Dates are compared by calendar day rather than adjacent row position.
Duplicate dates would produce the join multiplicity defined by the table data.

## Common mistakes

- Joining on id minus one assumes dates have no gaps.
- Comparing the current date to a later date reverses the condition.
- Using greater-than-or-equal includes equal temperatures.
- Treating March 4 as adjacent to March 2 ignores the calendar requirement.

## SQLite notes

SQLite date accepts the modifier string minus one day in the local reference.
The aliases make the current and previous rows explicit.
Only the current row id is selected as required.
