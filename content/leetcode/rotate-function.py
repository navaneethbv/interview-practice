class Solution:

    def maxRotateFunction(self, nums):
        total = sum(nums)
        f = sum((i * v for i, v in enumerate(nums)))
        best = f
        for v in reversed(nums[1:]):
            f += total - len(nums) * v
            best = max(best, f)
        return best
