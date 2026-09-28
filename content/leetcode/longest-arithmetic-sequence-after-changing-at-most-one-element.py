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
        best = max(self._extend_left(length, left_run, index),
                   self._extend_right(length, right_run, index))
        return max(best, self._join_runs(nums, left_run, right_run, index))

    def _extend_left(self, length, left_run, index):
        if not index:
            return 1
        return min(length, left_run[index - 1] + 1)

    def _extend_right(self, length, right_run, index):
        if index + 1 >= length:
            return 1
        return min(length, right_run[index + 1] + 1)

    def _join_runs(self, nums, left_run, right_run, index):
        if not (0 < index < len(nums) - 1):
            return 1
        gap = nums[index + 1] - nums[index - 1]
        if gap % 2:
            return 1
        difference = gap // 2
        left = self._matching_left(nums, left_run, index, difference)
        right = self._matching_right(nums, right_run, index, difference)
        return left + right + 1

    def _matching_left(self, nums, left_run, index, difference):
        if index >= 2 and nums[index - 1] - nums[index - 2] == difference:
            return left_run[index - 1]
        return 1

    def _matching_right(self, nums, right_run, index, difference):
        if index + 2 < len(nums) and nums[index + 2] - nums[index + 1] == difference:
            return right_run[index + 1]
        return 1
