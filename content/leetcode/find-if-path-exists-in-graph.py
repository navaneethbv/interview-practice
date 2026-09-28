class Solution:
    def validPath(self, n, edges, source, destination):
        parent = list(range(n))
        size = [1] * n
        for first, second in edges:
            first_root = self._find(parent, first)
            second_root = self._find(parent, second)
            if first_root == second_root:
                continue
            if size[first_root] < size[second_root]:
                first_root, second_root = second_root, first_root
            parent[second_root] = first_root
            size[first_root] += size[second_root]
        return self._find(parent, source) == self._find(parent, destination)

    def _find(self, parent, node):
        while parent[node] != node:
            parent[node] = parent[parent[node]]
            node = parent[node]
        return node
