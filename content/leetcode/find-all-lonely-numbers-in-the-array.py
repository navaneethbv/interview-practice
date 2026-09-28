from collections import Counter
class Solution:
    def findLonely(self, nums):
        counts = Counter(nums)
        lonely = []
        for value, count in counts.items():
            has_lower_neighbor = value - 1 in counts
            has_upper_neighbor = value + 1 in counts
            if count == 1 and not has_lower_neighbor and not has_upper_neighbor:
                lonely.append(value)
        return lonely
