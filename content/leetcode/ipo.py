import heapq


class Solution:
    def findMaximizedCapital(self, k, w, profits, capital):
        projects = sorted(zip(capital, profits))
        available = []
        project_index = 0
        for _ in range(k):
            while project_index < len(projects) and projects[project_index][0] <= w:
                heapq.heappush(available, -projects[project_index][1])
                project_index += 1
            if not available:
                break
            w -= heapq.heappop(available)
        return w
