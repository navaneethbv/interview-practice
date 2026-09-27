class Solution:
    def furthestBuilding(self, heights, bricks, ladders):
        import heapq
        climbs = []
        for index in range(len(heights) - 1):
            rise = heights[index + 1] - heights[index]
            if rise > 0:
                heapq.heappush(climbs,rise)
                if len(climbs) > ladders:
                    bricks -= heapq.heappop(climbs)
                if bricks < 0:
                    return index
        return len(heights)-1
