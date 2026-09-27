class Solution:
    def maxFrequency(self, nums, k):
        baseline = nums.count(k)
        best_gain = 0
        for source in set(nums) - {k}:
            current_gain = 0
            for value in nums:
                current_gain += (value == source) - (value == k)
                current_gain = max(0, current_gain)
                best_gain = max(best_gain, current_gain)
        return baseline + best_gain
