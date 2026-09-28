class Solution:
    def isStronglyConnected(self, graph):
        reverse = [[] for _ in graph]
        for node, neighbors in enumerate(graph):
            for neighbor in neighbors:
                reverse[neighbor].append(node)
        return self._reaches_all(graph) and self._reaches_all(reverse)

    def _reaches_all(self, graph):
        seen = {0}
        stack = [0]
        while stack:
            for neighbor in graph[stack.pop()]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    stack.append(neighbor)
        return len(seen) == len(graph)
