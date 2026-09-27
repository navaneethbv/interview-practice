import heapq


class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = []
        for value in nums:
            self._retain(value)

    def _retain(self, value):
        heapq.heappush(self.heap, value)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)

    def add(self, val):
        self._retain(val)
        return self.heap[0]
