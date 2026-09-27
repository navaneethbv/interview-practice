class Solution:
    def firstMissingPositive(self, nums):
        length = len(nums)
        for index in range(length):
            while (1 <= nums[index] <= length
                   and nums[nums[index] - 1] != nums[index]):
                target_index = nums[index] - 1
                nums[index], nums[target_index] = nums[target_index], nums[index]
        for index, value in enumerate(nums, 1):
            if value != index:
                return index
        return length + 1
