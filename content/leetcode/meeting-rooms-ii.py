import heapq
class Solution:
    def minMeetingRooms(self, intervals):
        ends = []
        best = 0
        for a,b in sorted(intervals):
            while ends and ends[0] <= a:
                heapq.heappop(ends)
            heapq.heappush(ends,b)
            best = max(best,len(ends))
        return best
