import heapq
class Solution:
    def maximalPathQuality(self,values,edges,maxTime):
        graph=[[] for _ in values]
        for a,b,t in edges:graph[a].append((b,t));graph[b].append((a,t))
        self._graph=graph;self._values=values;self._max_time=maxTime
        self._distance=self._distances_from_start(graph)
        self._visits=[0]*len(values);self._visits[0]=1;self._best=values[0]
        self._dfs(0,0,values[0])
        return self._best

    def _distances_from_start(self, graph):
        distance=[float('inf')]*len(graph);distance[0]=0;heap=[(0,0)]
        while heap:
            d,u=heapq.heappop(heap)
            if d!=distance[u]:continue
            for v,t in graph[u]:
                if d+t<distance[v]:distance[v]=d+t;heapq.heappush(heap,(d+t,v))
        return distance

    def _dfs(self, u, time, quality):
        """Explores walks that can still return to node 0 in time; a node's value counts once."""
        if u==0:self._best=max(self._best,quality)
        for v,t in self._graph[u]:
            if time+t+self._distance[v]>self._max_time:continue
            gain=0 if self._visits[v] else self._values[v]
            self._visits[v]+=1;self._dfs(v,time+t,quality+gain);self._visits[v]-=1
