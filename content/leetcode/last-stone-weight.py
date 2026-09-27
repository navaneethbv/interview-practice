import heapq
class Solution:
    def lastStoneWeight(self, stones):
        heap = [-x for x in stones]; heapq.heapify(heap)
        while len(heap)>1:
            first,second = -heapq.heappop(heap),-heapq.heappop(heap)
            if first != second: heapq.heappush(heap,second-first)
        return -heap[0] if heap else 0
