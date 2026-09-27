class Solution:
 def find132pattern(self,nums):
  stack=[];middle=float('-inf')
  for x in reversed(nums):
   if x<middle:return True
   while stack and stack[-1]<x:middle=stack.pop()
   stack.append(x)
  return False
