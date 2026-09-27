class Solution:
    def minCostConnectPoints(self, points):
        n = len(points)
        best, used = [float('inf')]*n, [False]*n
        best[0] = 0
        total = 0
        for _ in range(n):
            node = min((i for i in range(n) if not used[i]), key=lambda i:best[i])
            total += best[node]
            used[node] = True
            x,y = points[node]
            for i,(a,b) in enumerate(points):
                if not used[i]:
                    best[i] = min(best[i],abs(x-a)+abs(y-b))
        return total
