class Solution:
    def searchRange(self, nums, target):
        first = self._bound(nums, target, False)
        if first == len(nums) or nums[first] != target:
            return [-1, -1]
        last = self._bound(nums, target, True) - 1
        return [first, last]

    def _bound(self, nums, target, upper):
        left = 0
        right = len(nums)
        while left < right:
            middle = (left + right) // 2
            if nums[middle] < target or (upper and nums[middle] == target):
                left = middle + 1
            else:
                right = middle
        return left
