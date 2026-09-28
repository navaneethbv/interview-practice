class Solution:
    def minLength(self, nums, k):
        counts = {}
        distinct_sum = 0
        left = 0
        best = len(nums) + 1
        for right, value in enumerate(nums):
            if counts.get(value, 0) == 0:
                distinct_sum += value
            counts[value] = counts.get(value, 0) + 1
            while distinct_sum >= k:
                best = min(best, right - left + 1)
                removed = nums[left]
                counts[removed] -= 1
                left += 1
                if counts[removed] == 0:
                    distinct_sum -= removed
        return best if best <= len(nums) else -1
