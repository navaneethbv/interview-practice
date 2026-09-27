class Solution:
    def sortedSquares(self, nums):
        left = 0
        right = len(nums) - 1
        squared_values = [0] * len(nums)
        for output_index in range(len(nums) - 1, -1, -1):
            if abs(nums[left]) > abs(nums[right]):
                squared_values[output_index] = nums[left] * nums[left]
                left += 1
            else:
                squared_values[output_index] = nums[right] * nums[right]
                right -= 1
        return squared_values
