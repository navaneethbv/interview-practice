import heapq
class Solution:
    def networkDelayTime(self, times, n, k):
        graph = [[] for _ in range(n+1)]
        for a,b,w in times:
            graph[a].append((b,w))
        distances = [float('inf')]*(n+1)
        distances[k] = 0
        queue = [(0,k)]
        while queue:
            d,node = heapq.heappop(queue)
            if d != distances[node]:
                continue
            for child,w in graph[node]:
                if d+w < distances[child]:
                    distances[child] = d+w
                    heapq.heappush(queue,(d+w,child))
        answer = max(distances[1:])
        return -1 if answer == float('inf') else answer
