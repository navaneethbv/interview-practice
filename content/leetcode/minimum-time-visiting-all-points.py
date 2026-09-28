class Solution:
    def minTimeToVisitAllPoints(self, points):
        total = 0
        for index in range(1, len(points)):
            horizontal = abs(points[index][0] - points[index - 1][0])
            vertical = abs(points[index][1] - points[index - 1][1])
            total += max(horizontal, vertical)
        return total
