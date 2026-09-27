class Solution:
    def singleNonDuplicate(self, nums):
        left = 0
        right = len(nums) - 1

        while left < right:
            middle = (left + right) // 2
            middle -= middle % 2
            if nums[middle] == nums[middle + 1]:
                left = middle + 2
            else:
                right = middle

        return nums[left]
