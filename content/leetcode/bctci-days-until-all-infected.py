from collections import deque


class Solution:
    def daysToInfectAll(self, graph, infected):
        day = [-1] * len(graph)
        for node in infected:
            day[node] = 0
        queue = deque(infected)
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if day[neighbor] == -1:
                    day[neighbor] = day[node] + 1
                    queue.append(neighbor)
        return max(day)
