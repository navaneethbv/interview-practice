import heapq


class Solution:
    def networkDelayTime(self, times, n, k):
        graph = [[] for _ in range(n + 1)]
        for source, destination, travel_time in times:
            graph[source].append((destination, travel_time))

        distances = [float('inf')] * (n + 1)
        distances[k] = 0
        queue = [(0, k)]

        while queue:
            distance, node = heapq.heappop(queue)
            if distance != distances[node]:
                continue

            for neighbor, edge_time in graph[node]:
                new_distance = distance + edge_time
                if new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance
                    heapq.heappush(queue, (new_distance, neighbor))

        longest_distance = max(distances[1:])
        return -1 if longest_distance == float('inf') else longest_distance
