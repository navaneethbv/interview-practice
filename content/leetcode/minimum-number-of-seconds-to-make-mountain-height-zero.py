from math import isqrt
class Solution:
 def minNumberOfSeconds(self,mountainHeight,workerTimes):
  lo=0;hi=min(workerTimes)*mountainHeight*(mountainHeight+1)//2
  while lo<hi:
   mid=(lo+hi)//2;count=sum((isqrt(1+8*(mid//t))-1)//2 for t in workerTimes)
   if count>=mountainHeight:hi=mid
   else:lo=mid+1
  return lo
