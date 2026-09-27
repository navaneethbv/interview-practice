class Solution:
    def removeStones(self, stones):
        parent = {}
        size = {}
        def find(x):
            if x not in parent:
                parent[x] = x
                size[x] = 1
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        for row, column in stones:
            row_root = find(('r', row))
            column_root = find(('c', column))
            if row_root != column_root:
                if size[row_root] < size[column_root]:
                    row_root, column_root = column_root, row_root
                parent[column_root] = row_root
                size[row_root] += size[column_root]
        components = len({find(node) for node in parent})
        return len(stones) - components
