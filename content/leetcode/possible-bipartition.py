class Solution:
    def possibleBipartition(self, n, dislikes):
        graph = [[] for _ in range(n + 1)]
        for first, second in dislikes:
            graph[first].append(second)
            graph[second].append(first)
        colors = {}
        for start in range(1, n + 1):
            if start in colors:
                continue
            if not self._color(graph, start, colors):
                return False
        return True

    def _color(self, edges, start, colors):
        """Two-colors start's component; False when two people who dislike each other match."""
        colors[start] = 0
        queue = [start]
        for node in queue:
            for neighbor in edges[node]:
                if neighbor not in colors:
                    colors[neighbor] = 1 - colors[node]
                    queue.append(neighbor)
                elif colors[neighbor] == colors[node]:
                    return False
        return True
