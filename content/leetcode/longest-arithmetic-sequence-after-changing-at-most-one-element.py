class Solution:
    def longestArithmetic(self, nums):
        length = len(nums)
        left_run = [1] * length
        right_run = [1] * length
        left_run[1] = 2
        right_run[-2] = 2
        for index in range(2, length):
            previous_difference = nums[index - 1] - nums[index - 2]
            current_difference = nums[index] - nums[index - 1]
            left_run[index] = left_run[index - 1] + 1 if current_difference == previous_difference else 2
        for index in range(length - 3, -1, -1):
            next_difference = nums[index + 2] - nums[index + 1]
            current_difference = nums[index + 1] - nums[index]
            right_run[index] = right_run[index + 1] + 1 if current_difference == next_difference else 2

        best = max(left_run)
        for index in range(length):
            best = max(best, self._best_after_change(nums, left_run, right_run, index))
        return best

    def _best_after_change(self, nums, left_run, right_run, index):
        length = len(nums)
        best = 1
        if index:
            best = max(best, min(length, left_run[index - 1] + 1))
        if index + 1 < length:
            best = max(best, min(length, right_run[index + 1] + 1))
        if 0 < index < length - 1:
            gap = nums[index + 1] - nums[index - 1]
            if gap % 2 == 0:
                difference = gap // 2
                left = 1
                right = 1
                if index >= 2 and nums[index - 1] - nums[index - 2] == difference:
                    left = left_run[index - 1]
                if index + 2 < length and nums[index + 2] - nums[index + 1] == difference:
                    right = right_run[index + 1]
                best = max(best, left + right + 1)
        return best
