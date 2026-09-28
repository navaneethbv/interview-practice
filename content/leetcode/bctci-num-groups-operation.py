class UnionFind:
    def __init__(self):
        self.parent = {}
        self.sizes = {}
        self.minimum = {}
        self.groups = 0

    def add(self, x):
        self.parent[x] = x
        self.sizes[x] = 1
        self.minimum[x] = x
        self.groups += 1

    def _root(self, x):
        while x != self.parent[x]:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def find(self, x):
        return self.minimum[self._root(x)]

    def union(self, x, y):
        x, y = self._root(x), self._root(y)
        if x == y:
            return
        if self.sizes[x] < self.sizes[y]:
            x, y = y, x
        self.parent[y] = x
        self.sizes[x] += self.sizes[y]
        self.minimum[x] = min(self.minimum[x], self.minimum[y])
        self.groups -= 1

    def size(self):
        return len(self.parent)

    def num_groups(self):
        return self.groups
