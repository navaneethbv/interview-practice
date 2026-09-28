from heapq import heappush, heappop

class Solution:

    def minCost(self, n, prices, roads):
        g = [[] for _ in range(n)]
        for u, v, c, t in roads:
            g[u].append((v, c, c * t))
            g[v].append((u, c, c * t))

        def shortest(start, kind):
            d = [10 ** 30] * n
            d[start] = 0
            q = [(0, start)]
            while q:
                cost, u = heappop(q)
                if cost != d[u]:
                    continue
                for e in g[u]:
                    v = e[0]
                    nextcost = cost + e[kind]
                    if nextcost < d[v]:
                        d[v] = nextcost
                        heappush(q, (nextcost, v))
            return d
        ans = []
        for i in range(n):
            a, b = (shortest(i, 1), shortest(i, 2))
            ans.append(min((prices[j] + a[j] + b[j] for j in range(n))))
        return ans
