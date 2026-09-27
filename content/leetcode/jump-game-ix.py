class Solution:
 def maxValue(self,nums):
  n=len(nums);suffix=[10**18]*(n+1)
  for i in range(n-1,-1,-1):suffix[i]=min(nums[i],suffix[i+1])
  ans=[0]*n;start=0;largest=0
  for i,x in enumerate(nums):
   largest=max(largest,x)
   if largest<=suffix[i+1]:
    for j in range(start,i+1):ans[j]=largest
    start=i+1;largest=0
  return ans
