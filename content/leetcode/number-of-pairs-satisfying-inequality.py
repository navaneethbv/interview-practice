from bisect import bisect_left,bisect_right
class Solution:
 def numberOfPairs(self,nums1,nums2,diff):
  a=[x-y for x,y in zip(nums1,nums2)];values=sorted(set(a));bit=[0]*(len(values)+1);ans=0
  for v in a:
   i=bisect_right(values,v+diff)
   while i:ans+=bit[i];i-=i&-i
   i=bisect_left(values,v)+1
   while i<len(bit):bit[i]+=1;i+=i&-i
  return ans
