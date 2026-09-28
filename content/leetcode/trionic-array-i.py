class Solution:
    def isTrionic(self, nums):
        length = len(nums)
        index = self._walk_up(nums, 0)
        if index == 0:
            return False
        peak = index
        index = self._walk_down(nums, index)
        if index == peak or index == length - 1:
            return False
        index = self._walk_up(nums, index)
        return index == length - 1

    def _walk_up(self, nums, index):
        while index + 1 < len(nums) and nums[index] < nums[index + 1]:
            index += 1
        return index

    def _walk_down(self, nums, index):
        while index + 1 < len(nums) and nums[index] > nums[index + 1]:
            index += 1
        return index
