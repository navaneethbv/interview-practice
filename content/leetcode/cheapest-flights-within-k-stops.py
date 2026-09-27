class Solution:
    def findCheapestPrice(self, n, flights, src, dst, k):
        costs = [float('inf')] * n
        costs[src] = 0

        for _ in range(k + 1):
            updated_costs = costs.copy()
            for source, destination, price in flights:
                updated_costs[destination] = min(
                    updated_costs[destination],
                    costs[source] + price,
                )
            costs = updated_costs

        return -1 if costs[dst] == float('inf') else costs[dst]
