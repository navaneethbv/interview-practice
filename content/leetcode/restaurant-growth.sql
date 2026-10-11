WITH daily AS (SELECT visited_on, SUM(amount) AS amount FROM Customer GROUP BY visited_on)
SELECT d.visited_on, SUM(w.amount) AS amount, ROUND(SUM(w.amount) / 7.0, 2) AS average_amount
FROM daily d JOIN daily w ON w.visited_on BETWEEN DATE(d.visited_on, '-6 days') AND d.visited_on
WHERE d.visited_on >= (SELECT DATE(MIN(visited_on), '+6 days') FROM Customer)
GROUP BY d.visited_on
ORDER BY d.visited_on;
