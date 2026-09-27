class Solution:
    def findCheapestPrice(self, n, flights, src, dst, k):
        costs = [float('inf')]*n
        costs[src] = 0
        for _ in range(k+1):
            updated = costs.copy()
            for a,b,price in flights:
                updated[b] = min(updated[b],costs[a]+price)
            costs = updated
        return -1 if costs[dst] == float('inf') else costs[dst]
