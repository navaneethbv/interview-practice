class Solution:
 def getCollisionTimes(self,cars):
  ans=[-1.0]*len(cars);stack=[]
  for i in range(len(cars)-1,-1,-1):
   p,s=cars[i]
   while stack:
    j=stack[-1];q,t=cars[j]
    if s<=t:stack.pop();continue
    when=(q-p)/(s-t)
    if ans[j]<0 or when<=ans[j]:ans[i]=when;break
    stack.pop()
   stack.append(i)
  return ans
