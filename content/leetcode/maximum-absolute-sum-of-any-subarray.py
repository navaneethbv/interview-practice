class Solution:
    def maxAbsoluteSum(self,nums):
        prefix=low=high=0
        for x in nums:prefix+=x;low=min(low,prefix);high=max(high,prefix)
        return high-low
