class Solution:
    def hilliness(self, graph, heights):
        seen = [False] * len(graph)
        best = 0.0
        for start in range(len(graph)):
            if seen[start]:
                continue
            seen[start] = True
            stack, gain, endpoints = [start], 0.0, 0
            while stack:
                node = stack.pop()
                for neighbor in graph[node]:
                    gain += abs(heights[node] - heights[neighbor])
                    endpoints += 1
                    if not seen[neighbor]:
                        seen[neighbor] = True
                        stack.append(neighbor)
            if endpoints:
                best = max(best, gain / endpoints)
        return best
