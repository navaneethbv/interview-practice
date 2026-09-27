class Solution:
    def isBipartite(self, graph):
        colors = {}
        for start in range(len(graph)):
            if start in colors:
                continue
            if not self._color(graph, start, colors):
                return False
        return True

    def _color(self, graph, start, color):
        """Two-colors start's component; False on an edge between equal colors."""
        color[start] = 0
        stack = [start]
        while stack:
            node = stack.pop()
            for neighbor in graph[node]:
                if neighbor not in color:
                    color[neighbor] = 1 - color[node]
                    stack.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False
        return True
