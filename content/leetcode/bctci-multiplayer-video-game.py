class Solution:
    def _find(self, node, parent):
        while node != parent[node]:
            parent[node] = parent[parent[node]]
            node = parent[node]
        return node

    def _join(self, a, b, parent, sizes):
        a = self._find(a, parent)
        b = self._find(b, parent)
        if a == b:
            return False
        if sizes[a] < sizes[b]:
            a, b = b, a
        parent[b] = a
        sizes[a] += sizes[b]
        return True

    def solve(self, players):
        parent = list(range(len(players)))
        sizes = [1] * len(players)
        rows = {}
        columns = {}
        groups = len(players)
        for index, (x, y) in enumerate(players):
            for mapping, coordinate in ((rows, x), (columns, y)):
                if coordinate in mapping and self._join(index, mapping[coordinate], parent, sizes):
                    groups -= 1
                mapping[coordinate] = index
        return groups
