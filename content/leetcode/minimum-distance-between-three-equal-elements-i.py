class Solution:
 def minimumDistance(self,nums):
  positions={};best=len(nums)*3
  for i,x in enumerate(nums):
   a=positions.setdefault(x,[]);a.append(i)
   if len(a)>=3:best=min(best,2*(i-a[-3]))
  return best if best<len(nums)*3 else -1
