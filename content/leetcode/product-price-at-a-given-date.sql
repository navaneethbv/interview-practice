SELECT p.product_id, COALESCE((
  SELECT new_price FROM Products c
  WHERE c.product_id = p.product_id AND c.change_date <= '2019-08-16'
  ORDER BY c.change_date DESC LIMIT 1), 10) AS price
FROM (SELECT DISTINCT product_id FROM Products) p;
