from collections import deque
class Solution:
 def minJumps(self,nums):
  spf=self._smallest_prime_factors(max(nums))
  buckets=self._indices_by_prime_factor(nums,spf)
  dist=[-1]*len(nums);dist[0]=0;q=deque([0])
  while q:
   i=q.popleft()
   if i==len(nums)-1:return dist[i]
   neighbors=[i-1,i+1];v=nums[i]
   # A prime value teleports to every index divisible by it, once.
   if v>1 and spf[v]==v:neighbors+=buckets.pop(v,[])
   for j in neighbors:
    if 0<=j<len(nums) and dist[j]<0:dist[j]=dist[i]+1;q.append(j)

 @staticmethod
 def _smallest_prime_factors(maximum):
  spf=list(range(maximum+1))
  for p in range(2,int(maximum**0.5)+1):
   if spf[p]!=p:continue
   for v in range(p*p,maximum+1,p):
    if spf[v]==v:spf[v]=p
  return spf

 @staticmethod
 def _indices_by_prime_factor(nums,spf):
  buckets={}
  for i,v in enumerate(nums):
   while v>1:
    p=spf[v];buckets.setdefault(p,[]).append(i)
    while v%p==0:v//=p
  return buckets
