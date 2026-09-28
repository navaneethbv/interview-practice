class Solution:
    def longestIncreasingDegreePath(self, V, edges):
        degree = [0] * V
        neighbors = [[] for _ in range(V)]
        for u, v in edges:
            degree[u] += 1
            degree[v] += 1
            neighbors[u].append(v)
            neighbors[v].append(u)
        longest = [1] * V
        for node in sorted(range(V), key=lambda n: degree[n]):
            for other in neighbors[node]:
                if degree[other] > degree[node]:
                    longest[other] = max(longest[other], longest[node] + 1)
        return max(longest)
