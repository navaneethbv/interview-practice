SELECT b.BuildingID, b.BuildingName, COUNT(r.RequestID) AS OpenRequests
FROM Buildings b
LEFT JOIN Apartments a ON a.BuildingID = b.BuildingID
LEFT JOIN Requests r ON r.AptID = a.AptID AND r.Status = 'Open'
GROUP BY b.BuildingID, b.BuildingName;
