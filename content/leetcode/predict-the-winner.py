class Solution:
    def predictTheWinner(self, nums):
        best_difference = nums[:]
        for length in range(2, len(nums) + 1):
            for left in range(len(nums) - length + 1):
                right = left + length - 1
                take_left = nums[left] - best_difference[left + 1]
                take_right = nums[right] - best_difference[left]
                best_difference[left] = max(take_left, take_right)
        return best_difference[0] >= 0
