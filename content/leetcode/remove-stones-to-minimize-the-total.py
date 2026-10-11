import heapq


class Solution:
    def minStoneSum(self, piles, k):
        heap = [-p for p in piles]
        heapq.heapify(heap)
        for _ in range(k):
            largest = -heapq.heappop(heap)
            heapq.heappush(heap, -(largest - largest // 2))
        return -sum(heap)
