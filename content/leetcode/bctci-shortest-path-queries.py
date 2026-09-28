from collections import deque


class Solution:
    def shortestPaths(self, graph, start, queries):
        parent = {start: None}
        queue = deque([start])
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if neighbor not in parent:
                    parent[neighbor] = node
                    queue.append(neighbor)
        answers = []
        for target in queries:
            path = []
            node = target if target in parent else None
            while node is not None:
                path.append(node)
                node = parent[node]
            answers.append(path[::-1])
        return answers
