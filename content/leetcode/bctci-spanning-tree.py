from collections import deque


class Solution:
    def spanningTree(self, graph):
        seen = {0}
        edges = []
        queue = deque([0])
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    edges.append([node, neighbor])
                    queue.append(neighbor)
        return edges
