from heapq import heappush,heappop
class Solution:
 def minCost(self,n,edges):
  graph=[[] for _ in range(n)]
  for u,v,w in edges:graph[u].append((v,w));graph[v].append((u,2*w))
  dist=[float('inf')]*n;dist[0]=0;heap=[(0,0)]
  while heap:
   d,u=heappop(heap)
   if d!=dist[u]:continue
   if u==n-1:return d
   for v,w in graph[u]:
    if d+w<dist[v]:dist[v]=d+w;heappush(heap,(d+w,v))
  return -1
