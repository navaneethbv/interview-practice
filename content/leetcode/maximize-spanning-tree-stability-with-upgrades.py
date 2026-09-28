class _DisjointSet:
    def __init__(self, size):
        self.parent = list(range(size))
        self.size = [1] * size
        self.components = size

    def find(self, node):
        while self.parent[node] != node:
            self.parent[node] = self.parent[self.parent[node]]
            node = self.parent[node]
        return node

    def join(self, first, second):
        first_root = self.find(first)
        second_root = self.find(second)
        if first_root == second_root:
            return False
        if self.size[first_root] > self.size[second_root]:
            first_root, second_root = second_root, first_root
        self.parent[first_root] = second_root
        self.size[second_root] += self.size[first_root]
        self.components -= 1
        return True


class Solution:
    def maxStability(self, n, edges, k):
        if not self._possible(n, edges, k, 0):
            return -1
        low = 0
        high = 200000
        while low < high:
            middle = (low + high + 1) // 2
            if self._possible(n, edges, k, middle):
                low = middle
            else:
                high = middle - 1
        return low

    def _join_mandatory(self, dsu, edges, bound):
        for first, second, strength, mandatory in edges:
            if mandatory and (strength < bound or not dsu.join(first, second)):
                return False
        return True

    def _join_strong(self, dsu, edges, bound):
        for first, second, strength, mandatory in edges:
            if not mandatory and strength >= bound:
                dsu.join(first, second)

    def _join_upgradable(self, dsu, edges, bound):
        upgrades = 0
        for first, second, strength, mandatory in edges:
            if not mandatory and strength < bound <= 2 * strength:
                if dsu.join(first, second):
                    upgrades += 1
        return upgrades

    def _possible(self, n, edges, k, bound):
        dsu = _DisjointSet(n)
        if not self._join_mandatory(dsu, edges, bound):
            return False
        self._join_strong(dsu, edges, bound)
        upgrades = self._join_upgradable(dsu, edges, bound)
        return dsu.components == 1 and upgrades <= k
