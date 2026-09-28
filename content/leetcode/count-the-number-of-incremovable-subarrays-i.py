class Solution:
    def incremovableSubarrayCount(self, nums):
        n = len(nums)
        left = 0
        while left + 1 < n and nums[left] < nums[left + 1]:
            left += 1
        if left == n - 1:
            return n * (n + 1) // 2
        result = left + 2
        right = n - 1
        while True:
            while left >= 0 and nums[left] >= nums[right]:
                left -= 1
            result += left + 2
            if right == 0 or nums[right - 1] >= nums[right]:
                break
            right -= 1
        return result
