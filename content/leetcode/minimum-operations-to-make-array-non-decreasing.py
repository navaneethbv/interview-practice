class Solution:
 def minOperations(self,nums):return sum(max(0,a-b) for a,b in zip(nums,nums[1:]))
