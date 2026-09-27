class Solution:
 def canReach(self,arr,start):
  seen={start};stack=[start]
  while stack:
   i=stack.pop()
   if arr[i]==0:return True
   for j in (i-arr[i],i+arr[i]):
    if 0<=j<len(arr) and j not in seen:seen.add(j);stack.append(j)
  return False
