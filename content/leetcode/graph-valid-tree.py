class Solution:
    def validTree(self, n, edges):
        if len(edges) != n - 1:
            return False
        neighbors = [[] for _ in range(n)]
        for first, second in edges:
            neighbors[first].append(second)
            neighbors[second].append(first)
        seen = {0}
        pending = [0]
        while pending:
            vertex = pending.pop()
            for neighbor in neighbors[vertex]:
                if neighbor not in seen:
                    seen.add(neighbor)
                    pending.append(neighbor)
        return len(seen) == n
