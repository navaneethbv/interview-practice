from collections import Counter


class Solution:
    def intersect(self, nums1, nums2):
        counts = Counter(nums1)
        result = []
        for value in nums2:
            if counts[value] > 0:
                result.append(value)
                counts[value] -= 1
        return result
