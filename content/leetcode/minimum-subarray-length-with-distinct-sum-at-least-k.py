class Solution:
 def minLength(self,nums,k):
  counts={};total=0;left=0;best=len(nums)+1
  for right,x in enumerate(nums):
   if counts.get(x,0)==0:total+=x
   counts[x]=counts.get(x,0)+1
   while total>=k:
    best=min(best,right-left+1);v=nums[left];counts[v]-=1;left+=1
    if counts[v]==0:total-=v
  return best if best<=len(nums) else -1
