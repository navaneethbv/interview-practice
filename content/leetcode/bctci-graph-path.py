from collections import deque


class Solution:
    def findPath(self, graph, node1, node2):
        parent = {node1: None}
        queue = deque([node1])
        while queue:
            node = queue.popleft()
            if node == node2:
                break
            for neighbor in graph[node]:
                if neighbor not in parent:
                    parent[neighbor] = node
                    queue.append(neighbor)
        if node2 not in parent:
            return []
        path = []
        node = node2
        while node is not None:
            path.append(node)
            node = parent[node]
        return path[::-1]
