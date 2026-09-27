from math import isqrt
from functools import reduce
from operator import xor
class Solution:
 def xorAfterQueries(self,nums,queries):
  mod=1000000007;n=len(nums);threshold=isqrt(n)+1;groups={}
  for l,r,k,v in queries:
   if k>threshold:
    for i in range(l,r+1,k):nums[i]=nums[i]*v%mod
   else:groups.setdefault(k,[]).append((l,r,v))
  for k,group in groups.items():
   mul=[1]*(n+k)
   for l,r,v in group:
    end=l+((r-l)//k+1)*k;mul[l]=mul[l]*v%mod;mul[end]=mul[end]*pow(v,mod-2,mod)%mod
   for i in range(n):
    if i>=k:mul[i]=mul[i]*mul[i-k]%mod
    nums[i]=nums[i]*mul[i]%mod
  return reduce(xor,nums,0)
