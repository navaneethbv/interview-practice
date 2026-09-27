class Solution:
 def findMaxVal(self,n,restrictions,diff):
  a=[10**18]*n;a[0]=0
  for i,v in restrictions:a[i]=v
  for i in range(1,n):a[i]=min(a[i],a[i-1]+diff[i-1])
  for i in range(n-2,-1,-1):a[i]=min(a[i],a[i+1]+diff[i])
  return max(a)
