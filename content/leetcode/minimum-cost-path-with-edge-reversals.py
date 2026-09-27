from heapq import heappop, heappush


class Solution:
    def minCost(self, n, edges):
        graph = [[] for _ in range(n)]
        for start, end, weight in edges:
            graph[start].append((end, weight))
            graph[end].append((start, 2 * weight))

        distance = [float("inf")] * n
        distance[0] = 0
        pending = [(0, 0)]
        while pending:
            current_cost, node = heappop(pending)
            if current_cost != distance[node]:
                continue
            if node == n - 1:
                return current_cost
            for neighbor, edge_cost in graph[node]:
                next_cost = current_cost + edge_cost
                if next_cost < distance[neighbor]:
                    distance[neighbor] = next_cost
                    heappush(pending, (next_cost, neighbor))
        return -1
