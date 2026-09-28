import heapq


class Solution:
    def smallestK(self, arr, k):
        if k == 0:
            return []
        heap = []
        for value in arr:
            if len(heap) < k:
                heapq.heappush(heap, -value)
            elif -heap[0] > value:
                heapq.heapreplace(heap, -value)
        return [-value for value in heap]
