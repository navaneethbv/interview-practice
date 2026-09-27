class Solution:
    def rob(self, nums):
        if len(nums) == 1:
            return nums[0]
        return max(self._linear(nums, 0, len(nums) - 1),
                   self._linear(nums, 1, len(nums)))

    def _linear(self, nums, start, end):
        older = previous = 0
        for index in range(start, end):
            next_total = max(previous, older + nums[index])
            older = previous
            previous = next_total
        return previous
