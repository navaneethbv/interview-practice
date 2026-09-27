class Solution:
    def maxProduct(self, nums):
        low = high = best = nums[0]
        for x in nums[1:]:
            candidates = (x, x*low, x*high)
            low, high = min(candidates), max(candidates)
            best = max(best, high)
        return best
