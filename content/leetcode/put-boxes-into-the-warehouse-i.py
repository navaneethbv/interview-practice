class Solution:
 def maxBoxesInWarehouse(self,boxes,warehouse):
  for i in range(1,len(warehouse)):warehouse[i]=min(warehouse[i],warehouse[i-1])
  boxes.sort();j=0
  for h in reversed(warehouse):
   if j<len(boxes) and boxes[j]<=h:j+=1
  return j
