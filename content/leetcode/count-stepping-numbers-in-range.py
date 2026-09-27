from functools import lru_cache
class Solution:
 def countSteppingNumbers(self,low,high):
  mod=1000000007
  def count(s):
   @lru_cache(None)
   def visit(i,prev,tight):
    if i==len(s):return int(prev!=10)
    limit=int(s[i]) if tight else 9;ans=0
    for d in range(limit+1):
     if prev==10 and d==0:ans+=visit(i+1,10,tight and d==limit)
     elif prev==10 or abs(prev-d)==1:ans+=visit(i+1,d,tight and d==limit)
    return ans%mod
   return visit(0,10,True)
  return (count(high)-count(str(int(low)-1)))%mod
