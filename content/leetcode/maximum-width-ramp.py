class Solution:
    def maxWidthRamp(self, nums):
        decreasing_indices = []
        for index, value in enumerate(nums):
            if not decreasing_indices or value < nums[decreasing_indices[-1]]:
                decreasing_indices.append(index)
        best = 0
        for right in range(len(nums) - 1, -1, -1):
            while (decreasing_indices
                   and nums[decreasing_indices[-1]] <= nums[right]):
                best = max(best, right - decreasing_indices.pop())
        return best
