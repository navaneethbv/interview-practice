import heapq


class Solution:
    def maximalPathQuality(self, values, edges, maxTime):
        graph = [[] for _ in values]
        for first, second, travel_time in edges:
            graph[first].append((second, travel_time))
            graph[second].append((first, travel_time))
        self._graph = graph
        self._values = values
        self._max_time = maxTime
        self._distance = self._distances_from_start(graph)
        self._visits = [0] * len(values)
        self._visits[0] = 1
        self._best = values[0]
        self._dfs(0, 0, values[0])
        return self._best

    def _distances_from_start(self, graph):
        distance = [float('inf')] * len(graph)
        distance[0] = 0
        heap = [(0, 0)]
        while heap:
            current_distance, node = heapq.heappop(heap)
            if current_distance != distance[node]:
                continue
            for neighbor, travel_time in graph[node]:
                next_distance = current_distance + travel_time
                if next_distance < distance[neighbor]:
                    distance[neighbor] = next_distance
                    heapq.heappush(heap, (next_distance, neighbor))
        return distance

    def _dfs(self, node, current_time, current_quality):
        """Explore walks that can still return to node zero, counting each node once."""
        if node == 0:
            self._best = max(self._best, current_quality)
        for neighbor, travel_time in self._graph[node]:
            next_time = current_time + travel_time
            if next_time + self._distance[neighbor] > self._max_time:
                continue
            gain = 0 if self._visits[neighbor] else self._values[neighbor]
            self._visits[neighbor] += 1
            self._dfs(neighbor, next_time, current_quality + gain)
            self._visits[neighbor] -= 1
