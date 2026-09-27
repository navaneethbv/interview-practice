import heapq
class Solution:
    def getSkyline(self, buildings):
        positions=sorted({x for left,right,height in buildings for x in (left,right)})
        heap=[(0,float('inf'))];out=[];i=0
        for x in positions:
            while i<len(buildings) and buildings[i][0]<=x:
                left,right,height=buildings[i];heapq.heappush(heap,(-height,right));i+=1
            while heap[0][1]<=x:heapq.heappop(heap)
            height=-heap[0][0]
            if not out or out[-1][1]!=height:out.append([x,height])
        return out
