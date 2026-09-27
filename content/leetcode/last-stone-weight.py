import heapq


class Solution:
    def lastStoneWeight(self, stones):
        heap = [-weight for weight in stones]
        heapq.heapify(heap)
        while len(heap) > 1:
            heaviest = -heapq.heappop(heap)
            second = -heapq.heappop(heap)
            if heaviest != second:
                heapq.heappush(heap, -(heaviest - second))
        return -heap[0] if heap else 0
