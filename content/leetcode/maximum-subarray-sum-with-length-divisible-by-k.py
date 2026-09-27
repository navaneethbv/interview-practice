class Solution:
    def maxSubarraySum(self, nums, k):
        minimum_prefix = [float("inf")] * k
        minimum_prefix[0] = 0
        prefix = 0
        best = float("-inf")
        for index, value in enumerate(nums, 1):
            prefix += value
            remainder = index % k
            best = max(best, prefix - minimum_prefix[remainder])
            minimum_prefix[remainder] = min(minimum_prefix[remainder], prefix)
        return best
