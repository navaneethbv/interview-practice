class Solution:
    def firstAllConnected(self, V, cables):
        parent = list(range(V))

        def find(node):
            while parent[node] != node:
                parent[node] = parent[parent[node]]
                node = parent[node]
            return node

        components = V
        for index, (a, b) in enumerate(cables):
            root_a, root_b = find(a), find(b)
            if root_a != root_b:
                parent[root_a] = root_b
                components -= 1
                if components == 1:
                    return index
        return -1
