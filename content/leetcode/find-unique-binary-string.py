class Solution:
 def findDifferentBinaryString(self,nums):return ''.join('1' if s[i]=='0' else '0' for i,s in enumerate(nums))
