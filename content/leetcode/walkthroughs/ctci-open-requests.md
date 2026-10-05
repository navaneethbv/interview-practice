## Intuition

Each open request is reached through its apartment and then its building.
A left join beginning with Buildings preserves buildings that have no matching apartment or open request.
Counting a request identifier after filtering the status gives zero for those preserved rows.

## Brute force

A query could count requests separately for every building with a correlated subquery.
That repeats the join work and is harder to extend when more building fields are selected.

## Approach

Start from Buildings and left join Apartments by BuildingID.
Left join Requests by AptID while placing Status equal to Open in the join condition.
Group by BuildingID and BuildingName.
Count r.RequestID so unmatched rows contribute zero rather than one.
Return the three columns named by resultColumns.

## Walkthrough

In Example 1, North joins apartments 10 and 11, and each has one open request.
The closed request on apartment 10 is rejected by the join condition, so North counts 2.
South still survives the first left join, but its only request is closed, so r.RequestID is null and COUNT returns 0.

## Complexity

The query lets SQLite join and group the three tables in one statement.
Its runtime depends on the table sizes and available indexes, and the grouped result uses one row per building.
The query itself uses no temporary application-side storage.

## Edge cases

An empty Buildings table returns no rows.
Buildings without apartments remain because both relationships use LEFT JOIN.
Several open requests for one apartment are counted separately.
Two buildings may share a name because grouping includes the unique BuildingID.

## Common mistakes

Using INNER JOIN removes buildings whose open-request count should be zero.
Putting Status = Open in a WHERE clause after the left join also removes those buildings.
Counting apartment rows instead of request identifiers counts closed or requestless apartments incorrectly.

## SQLite notes

The reference uses SQLite-compatible LEFT JOIN, COUNT, and GROUP BY syntax.
COUNT(r.RequestID) ignores null request identifiers created by unmatched joins.
The semicolon terminates the standalone query used by the SQLite runner.
The result comparison is unordered, so no ORDER BY clause is required.
