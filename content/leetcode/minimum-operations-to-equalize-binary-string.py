class Solution:
 def minOperations(self,s,k):
  n=len(s);z=s.count('0')
  if z==0:return 0
  for moves in range(1,n+1):
   flips=moves*k;capacity=n*moves-(z if moves%2==0 else n-z)
   if flips>=z and (flips-z)%2==0 and flips<=capacity:return moves
  return -1
