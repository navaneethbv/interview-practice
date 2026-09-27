import heapq
class Solution:
    def minimumEffortPath(self,heights):
        m,n=len(heights),len(heights[0]);distance=[[float('inf')]*n for _ in range(m)];distance[0][0]=0;heap=[(0,0,0)]
        while heap:
            effort,r,c=heapq.heappop(heap)
            if effort!=distance[r][c]:continue
            if (r,c)==(m-1,n-1):return effort
            for a,b in [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
                if 0<=a<m and 0<=b<n:
                    new=max(effort,abs(heights[r][c]-heights[a][b]))
                    if new<distance[a][b]:distance[a][b]=new;heapq.heappush(heap,(new,a,b))
