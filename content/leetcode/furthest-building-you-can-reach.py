class Solution:
    def furthestBuilding(self, heights, bricks, ladders):
        import heapq
        climbs=[]
        for i in range(len(heights)-1):
            rise=heights[i+1]-heights[i]
            if rise>0:
                heapq.heappush(climbs,rise)
                if len(climbs)>ladders: bricks-=heapq.heappop(climbs)
                if bricks<0: return i
        return len(heights)-1
