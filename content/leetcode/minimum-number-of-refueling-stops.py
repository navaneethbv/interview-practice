class Solution:
    def minRefuelStops(self, target, startFuel, stations):
        import heapq
        heap=[]; reached=startFuel; i=stops=0
        while reached<target:
            while i<len(stations) and stations[i][0]<=reached: heapq.heappush(heap,-stations[i][1]); i+=1
            if not heap: return -1
            reached-=heapq.heappop(heap); stops+=1
        return stops
