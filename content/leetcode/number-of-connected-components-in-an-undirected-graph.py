class Solution:
    def countComponents(self, n, edges):
        parent = list(range(n))
        size = [1] * n
        components = n
        for first, second in edges:
            if self._unite(parent, size, first, second):
                components -= 1
        return components

    def _find(self, parent, vertex):
        while parent[vertex] != vertex:
            parent[vertex] = parent[parent[vertex]]
            vertex = parent[vertex]
        return vertex

    def _unite(self, parent, size, first, second):
        first_root = self._find(parent, first)
        second_root = self._find(parent, second)
        if first_root == second_root:
            return False
        if size[first_root] < size[second_root]:
            first_root, second_root = second_root, first_root
        parent[second_root] = first_root
        size[first_root] += size[second_root]
        return True
