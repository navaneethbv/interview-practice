SELECT t.TenantID, t.TenantName
FROM Tenants t
JOIN AptTenants a ON a.TenantID = t.TenantID
GROUP BY t.TenantID, t.TenantName
HAVING COUNT(*) > 1;
