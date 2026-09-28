class Solution:
    def allPathsSourceTarget(self, graph):
        paths = []
        self._visit(graph, [0], paths)
        return paths

    def _visit(self, graph, path, paths):
        node = path[-1]
        if node == len(graph) - 1:
            paths.append(path[:])
            return
        for child in graph[node]:
            path.append(child)
            self._visit(graph, path, paths)
            path.pop()
