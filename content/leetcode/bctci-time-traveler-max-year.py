import heapq


class Solution:
    def latestYear(self, points, k, maxAging):
        jumped = []
        jumped_total = 0
        best = points[0] + maxAging
        for j in range(1, len(points)):
            gap = points[j] - points[j - 1]
            heapq.heappush(jumped, gap)
            jumped_total += gap
            if len(jumped) > k:
                jumped_total -= heapq.heappop(jumped)
            aged = points[j] - points[0] - jumped_total
            if aged <= maxAging:
                best = max(best, points[j] + maxAging - aged)
        return best
