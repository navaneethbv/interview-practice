class Solution:
 def findRedundantConnection(self,edges):
  p=list(range(len(edges)+1))
  def find(x):
   while p[x]!=x:p[x]=p[p[x]];x=p[x]
   return x
  for a,b in edges:
   x,y=find(a),find(b)
   if x==y:return [a,b]
   p[x]=y
