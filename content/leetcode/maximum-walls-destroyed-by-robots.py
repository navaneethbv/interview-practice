from bisect import bisect_left,bisect_right
class Solution:
 def maxWalls(self,robots,distance,walls):
  paired=sorted(zip(robots,distance));occupied=set(robots);fixed=sum(w in occupied for w in walls);walls=sorted(w for w in walls if w not in occupied)
  def count(l,r):return max(0,bisect_right(walls,r)-bisect_left(walls,l)) if l<=r else 0
  x,d=paired[0];dp=[count(x-d,x-1),0]
  for i in range(1,len(paired)):
   p,pd=paired[i-1];x,d=paired[i];right=min(x-1,p+pd);left=max(p+1,x-d);a=count(p+1,right);b=count(left,x-1);overlap=count(left,right)
   dp=[max(dp[0]+b,dp[1]+a+b-overlap),max(dp[0],dp[1]+a)]
  x,d=paired[-1]
  return fixed+max(dp[0],dp[1]+count(x+1,x+d))
