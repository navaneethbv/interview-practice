class Solution:
 def solveQueries(self,nums,queries):
  positions={};n=len(nums);dist=[-1]*n
  for i,x in enumerate(nums):positions.setdefault(x,[]).append(i)
  for a in positions.values():
   if len(a)>1:
    for j,i in enumerate(a):dist[i]=min((i-a[j-1])%n,(a[(j+1)%len(a)]-i)%n)
  return [dist[i] for i in queries]
