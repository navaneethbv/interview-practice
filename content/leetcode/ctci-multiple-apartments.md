# Multiple Apartments

A rental database has these tables:

- `Tenants(TenantID, TenantName)`, one row per tenant.
- `AptTenants(TenantID, AptID)`, one row per tenant and apartment they rent; each pair appears once.

Write a SQLite query that lists every tenant who rents more than one apartment.
Return `TenantID` and `TenantName` in any order.

## Examples

### Example 1

```text
Input:
Tenants = [[1, "Ana"], [2, "Bo"], [3, "Cy"]]
AptTenants = [[1, 10], [1, 11], [2, 12], [3, 13], [3, 14], [3, 15]]
Output: [[1, "Ana"], [3, "Cy"]]
```

### Example 2

```text
Input:
Tenants = [[1, "Ana"]]
AptTenants = [[1, 10]]
Output: []
```

## Constraints

- Every `TenantID` in `AptTenants` exists in `Tenants`.
- Tenant names are not necessarily unique.
