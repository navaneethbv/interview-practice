class Solution:
    def findMaxAverage(self, nums, k):
        window_sum = 0
        for index in range(k):
            window_sum += nums[index]
        best_sum = window_sum
        for right in range(k, len(nums)):
            window_sum += nums[right] - nums[right - k]
            best_sum = max(best_sum, window_sum)
        return best_sum / k
