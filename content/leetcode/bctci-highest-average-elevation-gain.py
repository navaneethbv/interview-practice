class Solution:
    def highestAverageGain(self, V, edges):
        parent = list(range(V))

        def find(node):
            while parent[node] != node:
                parent[node] = parent[parent[node]]
                node = parent[node]
            return node

        for a, b, _ in edges:
            parent[find(a)] = find(b)
        totals, counts = {}, {}
        for a, _, gain in edges:
            root = find(a)
            totals[root] = totals.get(root, 0) + gain
            counts[root] = counts.get(root, 0) + 1
        return max((totals[root] / counts[root] for root in totals), default=0.0)
