from collections import Counter

class DetectSquares:
    def __init__(self):
        self.points = Counter()

    def add(self, point):
        self.points[tuple(point)] += 1

    def count(self, point):
        query_x, query_y = point
        total_squares = 0
        for (candidate_x, candidate_y), copies in self.points.items():
            side = abs(candidate_x - query_x)
            is_opposite_corner = candidate_x != query_x and side == abs(
                candidate_y - query_y
            )
            if is_opposite_corner:
                total_squares += (
                    copies
                    * self.points[(candidate_x, query_y)]
                    * self.points[(query_x, candidate_y)]
                )
        return total_squares
