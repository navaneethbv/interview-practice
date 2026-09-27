class Solution:
 def minRemoval(self,nums,k):
  nums.sort();left=0;best=0
  for right,x in enumerate(nums):
   while x>nums[left]*k:left+=1
   best=max(best,right-left+1)
  return len(nums)-best
