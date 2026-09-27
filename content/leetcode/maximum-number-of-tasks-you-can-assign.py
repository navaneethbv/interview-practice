from collections import deque
class Solution:
 def maxTaskAssign(self,tasks,workers,pills,strength):
  tasks.sort();workers.sort()
  def possible(k):
   q=deque();j=0;left=pills
   for w in workers[len(workers)-k:]:
    while j<k and tasks[j]<=w+strength:q.append(tasks[j]);j+=1
    if not q:return False
    if q[0]<=w:q.popleft()
    elif left:left-=1;q.pop()
    else:return False
   return True
  lo,hi=0,min(len(tasks),len(workers))
  while lo<hi:
   mid=(lo+hi+1)//2
   if possible(mid):lo=mid
   else:hi=mid-1
  return lo
