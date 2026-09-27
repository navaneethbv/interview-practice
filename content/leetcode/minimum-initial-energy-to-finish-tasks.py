class Solution:
 def minimumEffort(self,tasks):
  energy=initial=0
  for actual,minimum in sorted(tasks,key=lambda t:t[1]-t[0],reverse=True):
   if energy<minimum:initial+=minimum-energy;energy=minimum
   energy-=actual
  return initial
