class Solution:
    def canReachFinal(self, points, k, maxAging):
        gaps = sorted((b - a for a, b in zip(points, points[1:])), reverse=True)
        return sum(gaps[k:]) <= maxAging
