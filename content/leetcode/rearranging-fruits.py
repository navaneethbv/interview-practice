from collections import Counter
class Solution:
 def minCost(self,basket1,basket2):
  a,b=Counter(basket1),Counter(basket2);extra=[]
  for v in a.keys()|b.keys():
   d=a[v]-b[v]
   if d%2:return -1
   extra.extend([v]*(abs(d)//2))
  extra.sort();small=min(basket1+basket2)
  return sum(min(v,2*small) for v in extra[:len(extra)//2])
