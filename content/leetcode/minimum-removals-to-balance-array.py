class Solution:
    def minRemoval(self, nums, k):
        nums.sort()
        left = 0
        longest = 0
        for right, value in enumerate(nums):
            while value > nums[left] * k:
                left += 1
            longest = max(longest, right - left + 1)
        return len(nums) - longest
