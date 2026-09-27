import heapq
class Solution:
    def findKthLargest(self, nums, k):
        heap = []
        for value in nums:
            heapq.heappush(heap,value)
            if len(heap)>k: heapq.heappop(heap)
        return heap[0]
