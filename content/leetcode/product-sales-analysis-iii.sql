SELECT product_id,year AS first_year,quantity,price FROM Sales s WHERE year=(SELECT MIN(year) FROM Sales t WHERE t.product_id=s.product_id);
