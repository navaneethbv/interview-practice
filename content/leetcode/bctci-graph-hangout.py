from collections import deque


class Solution:
    def meetingCost(self, graph, node1, node2, node3):
        totals = [0] * len(graph)
        for start in (node1, node2, node3):
            for node, distance in enumerate(self._distances(graph, start)):
                totals[node] += distance
        return min(totals)

    def _distances(self, graph, start):
        distance = [-1] * len(graph)
        distance[start] = 0
        queue = deque([start])
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if distance[neighbor] == -1:
                    distance[neighbor] = distance[node] + 1
                    queue.append(neighbor)
        return distance
