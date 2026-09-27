class Solution:
    def makeConnected(self, n, connections):
        if len(connections) < n - 1:
            return -1
        parent = list(range(n))
        component_size = [1] * n
        components = n

        def find(node):
            while parent[node] != node:
                parent[node] = parent[parent[node]]
                node = parent[node]
            return node

        for first, second in connections:
            first_root = find(first)
            second_root = find(second)
            if first_root == second_root:
                continue
            if component_size[first_root] > component_size[second_root]:
                first_root, second_root = second_root, first_root
            parent[first_root] = second_root
            component_size[second_root] += component_size[first_root]
            components -= 1
        return components - 1
