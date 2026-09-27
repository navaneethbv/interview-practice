class Solution:
 def longestArithmetic(self,nums):
  n=len(nums);left=[1]*n;right=[1]*n;left[1]=2;right[-2]=2
  for i in range(2,n):left[i]=left[i-1]+1 if nums[i]-nums[i-1]==nums[i-1]-nums[i-2] else 2
  for i in range(n-3,-1,-1):right[i]=right[i+1]+1 if nums[i+1]-nums[i]==nums[i+2]-nums[i+1] else 2
  ans=max(left)
  for i in range(n):
   if i:ans=max(ans,min(n,left[i-1]+1))
   if i+1<n:ans=max(ans,min(n,right[i+1]+1))
   if 0<i<n-1 and (nums[i+1]-nums[i-1])%2==0:
    d=(nums[i+1]-nums[i-1])//2;l=left[i-1] if i>=2 and nums[i-1]-nums[i-2]==d else 1;r=right[i+1] if i+2<n and nums[i+2]-nums[i+1]==d else 1;ans=max(ans,l+1+r)
  return ans
