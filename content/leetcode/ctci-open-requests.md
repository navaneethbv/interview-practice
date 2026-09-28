# Open Requests

A rental database has these tables:

- `Buildings(BuildingID, BuildingName)`
- `Apartments(AptID, UnitNumber, BuildingID)`
- `Requests(RequestID, Status, AptID)`, where `Status` is `"Open"` or `"Closed"`.

Write a SQLite query that lists every building with its number of open requests.
Buildings with no open requests must appear with a count of 0.
Return `BuildingID`, `BuildingName`, and `OpenRequests` in any order.

## Examples

### Example 1

```text
Input:
Buildings = [[1, "North"], [2, "South"]]
Apartments = [[10, "1A", 1], [11, "1B", 1], [20, "2A", 2]]
Requests = [[100, "Open", 10], [101, "Closed", 10], [102, "Open", 11], [103, "Closed", 20]]
Output: [[1, "North", 2], [2, "South", 0]]
```

### Example 2

```text
Input:
Buildings = [[5, "East"]]
Apartments = []
Requests = []
Output: [[5, "East", 0]]
```

## Constraints

- Every foreign key refers to an existing row.
