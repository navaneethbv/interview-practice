from collections import Counter
class Solution:
 def getLargestOutlier(self,nums):
  counts=Counter(nums);total=sum(nums);answer=-1001
  for x in nums:
   rest=total-x
   if rest%2==0 and counts[rest//2]-(rest//2==x)>0:answer=max(answer,x)
  return answer
