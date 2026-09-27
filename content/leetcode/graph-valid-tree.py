class Solution:
    def validTree(self, n, edges):
        parent = list(range(n))
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x
        count = n
        for a,b in edges:
            a,b = find(a),find(b)
            if a != b:
                parent[a] = b
                count -= 1
        return count == 1 and len(edges) == n - 1
