class Solution:
 def maximumJumps(self,nums,target):
  dp=[-1]*len(nums);dp[0]=0
  for j in range(1,len(nums)):
   for i in range(j):
    if dp[i]>=0 and abs(nums[j]-nums[i])<=target:dp[j]=max(dp[j],dp[i]+1)
  return dp[-1]
