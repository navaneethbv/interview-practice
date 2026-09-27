class Solution:
 def maxStability(self,n,edges,k):
  def possible(bound):
   parent=list(range(n));components=n;used=0
   def join(a,b):
    def find(x):
     while parent[x]!=x:parent[x]=parent[parent[x]];x=parent[x]
     return x
    a,b=find(a),find(b)
    if a==b:return False
    parent[a]=b;return True
   for a,b,s,must in edges:
    if must:
     if s<bound or not join(a,b):return False
     components-=1
   for a,b,s,must in edges:
    if not must and s>=bound and join(a,b):components-=1
   for a,b,s,must in edges:
    if not must and s<bound<=2*s and join(a,b):components-=1;used+=1
   return components==1 and used<=k
  if not possible(0):return -1
  lo,hi=0,200000
  while lo<hi:
   mid=(lo+hi+1)//2
   if possible(mid):lo=mid
   else:hi=mid-1
  return lo
