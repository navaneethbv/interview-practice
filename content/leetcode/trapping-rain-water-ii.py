import heapq
class Solution:
    def trapRainWater(self, heightMap):
        m,n=len(heightMap),len(heightMap[0]);seen=set();heap=[]
        for r in range(m):
            for c in range(n):
                if r in (0,m-1) or c in (0,n-1):seen.add((r,c));heap.append((heightMap[r][c],r,c))
        heapq.heapify(heap);water=0
        while heap:
            level,r,c=heapq.heappop(heap)
            for a,b in ((r-1,c),(r+1,c),(r,c-1),(r,c+1)):
                if 0<=a<m and 0<=b<n and (a,b) not in seen:
                    seen.add((a,b));height=heightMap[a][b];water+=max(0,level-height);heapq.heappush(heap,(max(level,height),a,b))
        return water
