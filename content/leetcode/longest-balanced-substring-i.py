class Solution:
 def longestBalanced(self,s):
  ans=0
  for i in range(len(s)):
   count={};largest=0
   for j in range(i,len(s)):
    c=s[j];count[c]=count.get(c,0)+1;largest=max(largest,count[c])
    if largest*len(count)==j-i+1:ans=max(ans,j-i+1)
  return ans
