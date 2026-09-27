class Solution:
 def closestMeetingNode(self,edges,node1,node2):
  def distances(start):
   d=[-1]*len(edges);v=start;t=0
   while v!=-1 and d[v]==-1:d[v]=t;t+=1;v=edges[v]
   return d
  a,b=distances(node1),distances(node2);best=len(edges)+1;ans=-1
  for i in range(len(edges)):
   if a[i]>=0 and b[i]>=0 and max(a[i],b[i])<best:best=max(a[i],b[i]);ans=i
  return ans
