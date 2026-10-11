SELECT results FROM (
  SELECT * FROM (
    SELECT u.name AS results FROM MovieRating r JOIN Users u ON u.user_id = r.user_id
    GROUP BY r.user_id ORDER BY COUNT(*) DESC, u.name LIMIT 1)
  UNION ALL
  SELECT * FROM (
    SELECT m.title AS results FROM MovieRating r JOIN Movies m ON m.movie_id = r.movie_id
    WHERE r.created_at BETWEEN '2020-02-01' AND '2020-02-29'
    GROUP BY r.movie_id ORDER BY AVG(r.rating) DESC, m.title LIMIT 1)
);
