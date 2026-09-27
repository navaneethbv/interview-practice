class Solution:
 def isStrictlyPalindromic(self,n):
  # For n>=5, base n-2 represents n as 12; n=4 fails in base 2.
  return False
