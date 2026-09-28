from collections import deque, Counter, defaultdict
import heapq
import math

class Solution:
    def solve(self, n, edges):
        adjacency = [[] for _ in range(n)]
        for u, v in edges:
            adjacency[u].append(v)
            adjacency[v].append(u)
        def farthest(start):
            distances = [-1] * n
            distances[start] = 0
            queue = deque([start])
            last = start
            while queue:
                last = queue.popleft()
                for neighbor in adjacency[last]:
                    if distances[neighbor] == -1:
                        distances[neighbor] = distances[last] + 1
                        queue.append(neighbor)
            return last, distances[last]
        endpoint, _ = farthest(0)
        return farthest(endpoint)[1]
