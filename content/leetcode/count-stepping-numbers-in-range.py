from functools import lru_cache
MOD=1000000007
class Solution:
 def countSteppingNumbers(self,low,high):
  return (self._count(high)-self._count(str(int(low)-1)))%MOD

 def _count(self,s):
  """Stepping numbers in [1, s]; prev 10 means no nonzero digit has been placed yet."""
  @lru_cache(None)
  def visit(i,prev,tight):
   if i==len(s):return int(prev!=10)
   limit=int(s[i]) if tight else 9;ans=0
   for d in range(limit+1):
    if prev==10:nxt=10 if d==0 else d
    elif abs(prev-d)==1:nxt=d
    else:continue
    ans+=visit(i+1,nxt,tight and d==limit)
   return ans%MOD
  return visit(0,10,True)
