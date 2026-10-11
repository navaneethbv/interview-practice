SELECT m.employee_id, m.name, COUNT(*) AS reports_count, CAST(AVG(e.age) + 0.5 AS INTEGER) AS average_age
FROM Employees e JOIN Employees m ON m.employee_id = e.reports_to
GROUP BY m.employee_id, m.name
ORDER BY m.employee_id ASC;
