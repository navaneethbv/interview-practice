class Solution:
    def maxProduct(self, nums):
        low = high = best = nums[0]
        for index in range(1, len(nums)):
            value = nums[index]
            candidates = (value, value * low, value * high)
            low, high = min(candidates), max(candidates)
            best = max(best, high)
        return best
