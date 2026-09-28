from collections import deque


class Solution:
    def dagPath(self, V, edges, start, goal):
        adjacency = [[] for _ in range(V)]
        for u, v, w in edges:
            adjacency[u].append((v, w))
        distance = [None] * V
        previous = [None] * V
        distance[start] = 0
        for node in self._order(V, adjacency):
            if distance[node] is None:
                continue
            for v, w in adjacency[node]:
                if distance[v] is None or distance[node] + w < distance[v]:
                    distance[v] = distance[node] + w
                    previous[v] = node
        if distance[goal] is None:
            return []
        path = [goal]
        while path[-1] != start:
            path.append(previous[path[-1]])
        return path[::-1]

    def _order(self, V, adjacency):
        indegree = [0] * V
        for u in range(V):
            for v, _ in adjacency[u]:
                indegree[v] += 1
        queue = deque(node for node in range(V) if indegree[node] == 0)
        order = []
        while queue:
            node = queue.popleft()
            order.append(node)
            for v, _ in adjacency[node]:
                indegree[v] -= 1
                if indegree[v] == 0:
                    queue.append(v)
        return order
