from collections import Counter
class Solution:
 def largestPalindromic(self,num):
  c=Counter(num);left=''
  for d in '9876543210':
   if d!='0' or left:left+=d*(c[d]//2);c[d]%=2
  middle=next((d for d in '9876543210' if c[d]),'')
  return left+middle+left[::-1] or '0'
