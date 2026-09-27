from functools import lru_cache
MOD=1000000007
NO_DIGIT=10
class Solution:
 def countSteppingNumbers(self,low,high):
  return (self._count(high)-self._count(str(int(low)-1)))%MOD

 def _count(self,s):
  """Stepping numbers in [1, s]; NO_DIGIT means no nonzero digit has been placed yet."""
  @lru_cache(None)
  def visit(i,prev,tight):
   if i==len(s):return int(prev!=NO_DIGIT)
   limit=int(s[i]) if tight else 9
   return sum(visit(i+1,nxt,tight and d==limit) for d in range(limit+1) if (nxt:=self._next_prev(prev,d)) is not None)%MOD
  return visit(0,NO_DIGIT,True)

 @staticmethod
 def _next_prev(prev,d):
  """The state after placing digit d, or None when d breaks the stepping rule."""
  if prev==NO_DIGIT:return NO_DIGIT if d==0 else d
  return d if abs(prev-d)==1 else None
