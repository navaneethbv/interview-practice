class Solution:
    def pivotIndex(self, nums):
        total = sum(nums)
        left_sum = 0
        for index, value in enumerate(nums):
            right_sum = total - left_sum - value
            if left_sum == right_sum:
                return index
            left_sum += value
        return -1
