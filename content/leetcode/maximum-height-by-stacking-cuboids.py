class Solution:
 def maxHeight(self,cuboids):
  a=sorted(sorted(c) for c in cuboids);dp=[]
  for i,c in enumerate(a):dp.append(c[2]+max((dp[j] for j in range(i) if all(a[j][k]<=c[k] for k in range(3))),default=0))
  return max(dp)
