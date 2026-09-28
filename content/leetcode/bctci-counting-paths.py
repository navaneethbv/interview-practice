from collections import deque


class Solution:
    MOD = 1_000_000_007

    def countPaths(self, graph, start):
        indegree = [0] * len(graph)
        for neighbors in graph:
            for v in neighbors:
                indegree[v] += 1
        queue = deque(node for node in range(len(graph)) if indegree[node] == 0)
        paths = [0] * len(graph)
        paths[start] = 1
        while queue:
            node = queue.popleft()
            for v in graph[node]:
                paths[v] = (paths[v] + paths[node]) % self.MOD
                indegree[v] -= 1
                if indegree[v] == 0:
                    queue.append(v)
        return paths
