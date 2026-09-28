class Solution:
    def minimumCost(self, nums):
        two_smallest = sorted(nums[1:])[:2]
        return nums[0] + sum(two_smallest)
