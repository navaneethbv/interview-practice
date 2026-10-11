SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM Insurance i
WHERE (SELECT COUNT(*) FROM Insurance o WHERE o.tiv_2015 = i.tiv_2015) > 1
  AND (SELECT COUNT(*) FROM Insurance o WHERE o.lat = i.lat AND o.lon = i.lon) = 1;
