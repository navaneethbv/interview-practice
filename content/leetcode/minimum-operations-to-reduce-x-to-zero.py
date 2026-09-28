class Solution:
    def minOperations(self, nums, x):
        target = sum(nums) - x
        if target < 0:
            return -1
        if target == 0:
            return len(nums)

        left = 0
        window_sum = 0
        longest = -1
        for right, value in enumerate(nums):
            window_sum += value
            while window_sum > target:
                window_sum -= nums[left]
                left += 1
            if window_sum == target:
                longest = max(longest, right - left + 1)
        return len(nums) - longest if longest >= 0 else -1
