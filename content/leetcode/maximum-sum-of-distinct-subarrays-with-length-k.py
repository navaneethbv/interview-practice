class Solution:
    def maximumSubarraySum(self, nums, k):
        from collections import Counter
        counts = Counter()
        total = 0
        best = 0
        for right_index, value in enumerate(nums):
            counts[value] += 1
            total += value
            if right_index >= k:
                old_value = nums[right_index - k]
                total -= old_value
                counts[old_value] -= 1
                if counts[old_value] == 0:
                    del counts[old_value]
            if right_index >= k - 1 and len(counts) == k:
                best = max(best, total)
        return best
