from collections import Counter

class Solution:

    def frequencySort(self, nums):
        counts = Counter(nums)
        return sorted(nums, key=lambda x: (counts[x], -x))
