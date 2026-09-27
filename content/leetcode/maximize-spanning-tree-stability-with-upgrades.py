class _DisjointSet:
 def __init__(self,n):
  self.parent=list(range(n));self.components=n

 def find(self,x):
  parent=self.parent
  while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
  return x

 def join(self,a,b):
  a,b=self.find(a),self.find(b)
  if a==b:return False
  self.parent[a]=b;self.components-=1;return True

class Solution:
 def maxStability(self,n,edges,k):
  if not self._possible(n,edges,k,0):return -1
  lo,hi=0,200000
  while lo<hi:
   mid=(lo+hi+1)//2
   if self._possible(n,edges,k,mid):lo=mid
   else:hi=mid-1
  return lo

 def _possible(self,n,edges,k,bound):
  """Whether a spanning tree can have every edge at least `bound` using at most k doublings."""
  dsu=_DisjointSet(n)
  if any(must and (s<bound or not dsu.join(a,b)) for a,b,s,must in edges):return False
  for a,b,s,must in edges:
   if not must and s>=bound:dsu.join(a,b)
  used=sum(1 for a,b,s,must in edges if not must and s<bound<=2*s and dsu.join(a,b))
  return dsu.components==1 and used<=k
