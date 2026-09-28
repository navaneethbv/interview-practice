from collections import deque


class Solution:
    def hasRoute(self, n, edges, start, end):
        neighbors = [[] for _ in range(n)]
        for source, target in edges:
            neighbors[source].append(target)
        visited = [False] * n
        visited[start] = True
        queue = deque([start])
        while queue:
            node = queue.popleft()
            if node == end:
                return True
            for nxt in neighbors[node]:
                if not visited[nxt]:
                    visited[nxt] = True
                    queue.append(nxt)
        return False
