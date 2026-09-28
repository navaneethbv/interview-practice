# Close All Requests

A rental database has these tables:

- `Apartments(AptID, UnitNumber, BuildingID)`
- `Requests(RequestID, Status, AptID)`, where `Status` is `"Open"` or `"Closed"`.

Building 11 is being renovated.
Write a SQLite statement that sets `Status` to `"Closed"` for every request from an apartment in building 11.
Other requests must not change.
The judge then reads `RequestID`, `Status`, and `AptID` from `Requests` in any order.

## Examples

### Example 1

```text
Input:
Apartments = [[1, "1A", 11], [2, "2A", 12]]
Requests = [[10, "Open", 1], [11, "Open", 2], [12, "Closed", 1]]
Output: [[10, "Closed", 1], [11, "Open", 2], [12, "Closed", 1]]
```

### Example 2

```text
Input:
Apartments = [[2, "2A", 12]]
Requests = [[11, "Open", 2]]
Output: [[11, "Open", 2]]
```

## Constraints

- Every `AptID` in `Requests` exists in `Apartments`.
