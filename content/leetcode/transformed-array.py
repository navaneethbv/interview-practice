class Solution:
 def constructTransformedArray(self,nums):return [nums[(i+x)%len(nums)] for i,x in enumerate(nums)]
