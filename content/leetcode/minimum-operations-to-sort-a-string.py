class Solution:
 def minOperations(self,s):
  if all(a<=b for a,b in zip(s,s[1:])):return 0
  if len(s)==2:return -1
  low,high=min(s),max(s)
  if s[0]==low or s[-1]==high:return 1
  if low in s[1:-1] or high in s[1:-1]:return 2
  return 3
