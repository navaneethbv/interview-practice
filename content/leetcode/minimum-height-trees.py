from collections import deque
class Solution:
    def findMinHeightTrees(self, n, edges):
        if n == 1:
            return [0]
        adj = [set() for _ in range(n)]
        for a,b in edges:
            adj[a].add(b)
            adj[b].add(a)
        leaves = deque(i for i in range(n) if len(adj[i]) == 1)
        remaining = n
        while remaining > 2:
            remaining -= len(leaves)
            for _ in range(len(leaves)):
                leaf = leaves.popleft()
                for neighbor in adj[leaf]:
                    adj[neighbor].remove(leaf)
                    if len(adj[neighbor]) == 1:
                        leaves.append(neighbor)
        return list(leaves)
