import math


class Solution:
    def assignCenters(self, points, center1, center2):
        costs = [(math.dist(point, center1), math.dist(point, center2)) for point in points]
        costs.sort(key=lambda pair: pair[0] - pair[1])
        half = len(points) // 2
        return sum(first for first, _ in costs[:half]) + sum(second for _, second in costs[half:])
