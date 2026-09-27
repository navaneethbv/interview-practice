class Solution:
 def maximumAND(self,nums,k,m):
  answer=0
  for bit in range(30,-1,-1):
   mask=answer|(1<<bit);costs=[]
   for x in nums:
    missing=mask&~x
    if missing:
     b=missing.bit_length();y=(x>>b<<b)|(mask&((1<<b)-1));costs.append(y-x)
    else:costs.append(0)
   if sum(sorted(costs)[:m])<=k:answer=mask
  return answer
