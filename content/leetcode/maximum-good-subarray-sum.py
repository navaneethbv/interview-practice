class Solution:
 def maximumSubarraySum(self,nums,k):
  minimum={};prefix=0;ans=None
  for x in nums:
   minimum[x]=min(minimum.get(x,prefix),prefix);prefix+=x
   for v in (x-k,x+k):
    if v in minimum:
     s=prefix-minimum[v];ans=s if ans is None else max(ans,s)
  return 0 if ans is None else ans
