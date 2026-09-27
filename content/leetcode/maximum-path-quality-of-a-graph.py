import heapq
class Solution:
    def maximalPathQuality(self,values,edges,maxTime):
        graph=[[] for _ in values]
        for a,b,t in edges:graph[a].append((b,t));graph[b].append((a,t))
        distance=[float('inf')]*len(values);distance[0]=0;heap=[(0,0)]
        while heap:
            d,u=heapq.heappop(heap)
            if d!=distance[u]:continue
            for v,t in graph[u]:
                if d+t<distance[v]:distance[v]=d+t;heapq.heappush(heap,(d+t,v))
        visits=[0]*len(values);visits[0]=1;best=values[0]
        def dfs(u,time,quality):
            nonlocal best
            if u==0:best=max(best,quality)
            for v,t in graph[u]:
                if time+t+distance[v]>maxTime:continue
                gain=0 if visits[v] else values[v];visits[v]+=1;dfs(v,time+t,quality+gain);visits[v]-=1
        dfs(0,0,values[0]);return best
