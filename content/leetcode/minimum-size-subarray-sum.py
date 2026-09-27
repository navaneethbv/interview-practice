class Solution:
    def minSubArrayLen(self, target, nums):
        left = 0
        running_sum = 0
        shortest = len(nums) + 1

        for right, value in enumerate(nums):
            running_sum += value
            while running_sum >= target:
                shortest = min(shortest, right - left + 1)
                running_sum -= nums[left]
                left += 1

        return shortest if shortest <= len(nums) else 0
