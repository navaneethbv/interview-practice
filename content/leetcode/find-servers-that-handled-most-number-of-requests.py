import heapq


class Solution:
    def busiestServers(self, k, arrival, load):
        available = list(range(k))
        busy = []
        counts = [0] * k
        for index, (time, duration) in enumerate(zip(arrival, load)):
            while busy and busy[0][0] <= time:
                _, server = heapq.heappop(busy)
                # Map the server to its next position in cyclic request order.
                priority = index + (server - index) % k
                heapq.heappush(available, priority)
            if available:
                server = heapq.heappop(available) % k
                counts[server] += 1
                heapq.heappush(busy, (time + duration, server))
        best = max(counts)
        return [server for server, count in enumerate(counts) if count == best]
