SELECT query_name,ROUND(AVG(1.0*rating/position),2) AS quality,ROUND(100.0*AVG(rating<3),2) AS poor_query_percentage FROM Queries GROUP BY query_name;
