from collections import defaultdict


def count_at_most(nums, distinct_limit):
    counts = defaultdict(int)
    left = 0
    total = 0
    for right, value in enumerate(nums):
        counts[value] += 1
        while len(counts) > distinct_limit:
            old_value = nums[left]
            counts[old_value] -= 1
            if counts[old_value] == 0:
                del counts[old_value]
            left += 1
        total += right - left + 1
    return total


class Solution:
    def subarraysWithKDistinct(self, nums, k):
        return count_at_most(nums, k) - count_at_most(nums, k - 1)
