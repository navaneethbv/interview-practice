from collections import deque


class Solution:
    SENTINEL = 2147483647

    def dagDistances(self, V, edges, start):
        adjacency = [[] for _ in range(V)]
        for u, v, w in edges:
            adjacency[u].append((v, w))
        best = [self.SENTINEL] * V
        best[start] = 0
        for node in self._order(V, adjacency):
            if best[node] == self.SENTINEL:
                continue
            for v, w in adjacency[node]:
                if best[v] == self.SENTINEL or best[node] + w < best[v]:
                    best[v] = best[node] + w
        return best

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
