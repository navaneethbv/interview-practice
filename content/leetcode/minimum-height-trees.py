from collections import deque

class Solution:
    def findMinHeightTrees(self, n, edges):
        if n == 1:
            return [0]

        neighbors = [set() for _ in range(n)]
        for first, second in edges:
            neighbors[first].add(second)
            neighbors[second].add(first)

        leaves = deque(
            vertex
            for vertex in range(n)
            if len(neighbors[vertex]) == 1
        )
        remaining_vertices = n
        while remaining_vertices > 2:
            remaining_vertices -= len(leaves)
            for _ in range(len(leaves)):
                leaf = leaves.popleft()
                for neighbor in neighbors[leaf]:
                    neighbors[neighbor].remove(leaf)
                    if len(neighbors[neighbor]) == 1:
                        leaves.append(neighbor)
        return list(leaves)
