class Solution:
 def minimumCost(self,source,target,original,changed,cost):
  inf=10**30;dist=[[inf]*26 for _ in range(26)]
  for i in range(26):dist[i][i]=0
  for a,b,c in zip(original,changed,cost):
   x=ord(a)-97;y=ord(b)-97;dist[x][y]=min(dist[x][y],c)
  for k in range(26):
   for i in range(26):
    for j in range(26):dist[i][j]=min(dist[i][j],dist[i][k]+dist[k][j])
  answer=sum(dist[ord(a)-97][ord(b)-97] for a,b in zip(source,target))
  return answer if answer<inf else -1
