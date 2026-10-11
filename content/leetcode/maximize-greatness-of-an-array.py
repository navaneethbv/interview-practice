class Solution:
    def maximizeGreatness(self, nums):
        nums = sorted(nums)
        matched = 0
        for x in nums:
            if x > nums[matched]:
                matched += 1
        return matched
