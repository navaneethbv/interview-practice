class Solution:
 def minEdgeReversals(self,n,edges):
  g=[[] for _ in range(n)]
  for a,b in edges:g[a].append((b,0));g[b].append((a,1))
  parent=[-1]*n;parent[0]=0;order=[0];cost=[0]*n;initial=0
  for u in order:
   for v,c in g[u]:
    if v!=parent[u]:parent[v]=u;cost[v]=c;initial+=c;order.append(v)
  ans=[initial]*n
  for v in order[1:]:ans[v]=ans[parent[v]]+1-2*cost[v]
  return ans
